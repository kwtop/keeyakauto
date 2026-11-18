import test from 'node:test';
import assert from 'node:assert/strict';
import {prefersMarkdown, varyOnAccept, negotiateMarkdown} from '../server/markdown-negotiation.ts';
import {htmlToAgentMarkdown} from '../scripts/lib/agent-markdown.mjs';

test('Accept negotiation honors explicit types, quality weights and exclusions', () => {
  const cases = [
    [null, false], ['', false], ['*/*', false], ['text/*', false],
    ['text/html,application/xhtml+xml,*/*;q=0.8', false],
    ['text/markdown', true], ['TEXT/MARKDOWN; charset=utf-8', true],
    ['text/markdown, text/html', true], ['text/markdown, */*;q=0.8', true],
    ['text/markdown;q=0, text/html', false], ['text/markdown;q=0, */*', false],
    ['text/markdown;q=0.5, text/html;q=1', false],
    ['text/markdown;q=0.8, text/html;q=0.2', true],
    ['text/html;q=0, text/*;q=1, text/markdown;q=0.5', true],
    ['text/markdown;q=2', false], ['text/markdown;q=invalid', false],
  ];
  for (const [value, expected] of cases) assert.equal(prefersMarkdown(value), expected, value);
});

test('Vary preserves other cache dimensions without duplicate Accept entries', () => {
  const headers = new Headers({Vary: 'Accept-Encoding, Origin'});
  varyOnAccept(headers); varyOnAccept(headers);
  assert.equal(headers.get('Vary'), 'Accept-Encoding, Origin, Accept');
  const all = new Headers({Vary: '*'}); varyOnAccept(all);
  assert.equal(all.get('Vary'), '*');
});

const page = {asset: '/_agent-markdown/example.md', canonical: 'https://keeyakauto.com/example/', etag: '"md-example"', tokens: 42};
function mockContext(accept, {method = 'GET', status = 200, missing = false, headers = {}} = {}) {
  const calls = {html: [], assets: []};
  return {
    calls,
    request: new Request(page.canonical, {method, headers: {Accept: accept, ...headers}}),
    async next(request) {
      calls.html.push(request);
      return new Response(method === 'HEAD' ? null : '<h1>Original HTML</h1>', {status, headers: {
        'Content-Type': 'text/html; charset=utf-8', Vary: 'Accept-Encoding',
        ETag: '"html-only"', 'Last-Modified': 'Wed, 04 Nov 2026 00:00:00 GMT',
        'Content-Encoding': 'gzip', 'Content-Length': '22', 'Accept-Ranges': 'bytes',
        'X-Frame-Options': 'DENY', 'Cache-Control': 'public, max-age=0, must-revalidate',
      }});
    },
    env: {ASSETS: {async fetch(request) {
      calls.assets.push(request);
      return new Response(method === 'HEAD' ? null : '# Markdown\n', {status: missing ? 404 : 200});
    }}},
  };
}

test('HTML stays byte-identical and receives a separate cache variation', async () => {
  const context = mockContext('text/html');
  const response = await negotiateMarkdown(context, page);
  assert.equal(await response.text(), '<h1>Original HTML</h1>');
  assert.match(response.headers.get('Content-Type'), /^text\/html/);
  assert.equal(response.headers.get('ETag'), '"html-only"');
  assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(context.calls.assets.length, 0);
});

test('Markdown preserves origin policy headers and has its own validators and token count', async () => {
  const context = mockContext('text/markdown', {headers: {'If-None-Match': '"html-only"', 'If-Modified-Since': 'Wed, 04 Nov 2026 00:00:00 GMT', Range: 'bytes=0-4'}});
  const response = await negotiateMarkdown(context, page);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '# Markdown\n');
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(response.headers.get('ETag'), page.etag);
  assert.equal(response.headers.get('X-Markdown-Tokens'), '42');
  assert.equal(response.headers.get('X-Markdown-Tokenizer'), 'o200k_base');
  assert.equal(response.headers.get('X-Frame-Options'), 'DENY');
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=0, must-revalidate');
  for (const name of ['Content-Encoding', 'Content-Length', 'Last-Modified', 'Accept-Ranges']) assert.equal(response.headers.get(name), null);
  const forwarded = context.calls.html[0].headers;
  for (const name of ['If-None-Match', 'If-Modified-Since', 'Range']) assert.equal(forwarded.get(name), null);
  assert.equal(forwarded.get('Accept'), 'text/html');
});

test('Markdown conditional GET validates the Markdown representation only', async () => {
  const context = mockContext('text/markdown', {headers: {'If-None-Match': 'W/"md-example"'}});
  const response = await negotiateMarkdown(context, page);
  assert.equal(response.status, 304);
  assert.equal(await response.text(), '');
  assert.equal(response.headers.get('ETag'), page.etag);
  assert.equal(context.calls.assets.length, 0);
});

test('HEAD negotiates the same metadata without returning a body', async () => {
  const context = mockContext('text/markdown', {method: 'HEAD'});
  const response = await negotiateMarkdown(context, page);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('X-Markdown-Tokens'), '42');
  assert.equal(await response.text(), '');
  assert.equal(context.calls.assets[0].method, 'HEAD');
});

test('error status and missing assets do not turn HTML into false Markdown', async () => {
  const notFound = mockContext('text/markdown', {status: 404});
  const error = await negotiateMarkdown(notFound, page);
  assert.equal(error.status, 404);
  assert.match(error.headers.get('Content-Type'), /^text\/html/);
  assert.equal(notFound.calls.assets.length, 0);
  const missing = await negotiateMarkdown(mockContext('text/markdown', {missing: true}), page);
  assert.match(missing.headers.get('Content-Type'), /^text\/html/);
  assert.equal(await missing.text(), '<h1>Original HTML</h1>');
});

test('conversion keeps meaningful tables, FAQ and sources while stripping page chrome and executable code', () => {
  const html = `<!doctype html><html><head><title>Car guide</title><meta name="description" content="Costs &amp; checks"><script type="application/ld+json">{"@type":"Article","headline":"Car guide"}</script></head><body><header>Site navigation</header><main><nav>Breadcrumb navigation</nav><h1>Car guide</h1><p>Compare <a href="../quotes/">quotes</a> &amp; costs.</p><table><thead><tr><th>Stage</th><th>Evidence</th></tr></thead><tbody><tr><td>Inspection</td><td>VIN report</td></tr></tbody></table><details><summary>Can I inspect it?</summary><p>Agree the inspection scope.</p></details><p><a href="#sources">Sources</a></p><img src="/images/car.webp" alt="Vehicle side view"><div hidden>Hidden copy</div><div aria-hidden="true">Decorative copy</div><button>Next slide</button><input value="Do not expose fields"><script>secretScript()</script><style>.private-style{}</style></main><footer>Site footer</footer></body></html>`;
  const markdown = htmlToAgentMarkdown(html, 'https://keeyakauto.com/guides/car/');
  assert.match(markdown, /# Car guide/);
  assert.match(markdown, /\| Stage \| Evidence \|/);
  assert.match(markdown, /\| Inspection \| VIN report \|/);
  assert.match(markdown, /### Can I inspect it\?/);
  assert.match(markdown, /\[quotes\]\(https:\/\/keeyakauto\.com\/guides\/quotes\/\)/);
  assert.match(markdown, /\[Sources\]\(https:\/\/keeyakauto\.com\/guides\/car\/#sources\)/);
  assert.match(markdown, /!\[Vehicle side view\]\(https:\/\/keeyakauto\.com\/images\/car.webp\)/);
  assert.match(markdown, /"@type": "Article"/);
  assert.doesNotMatch(markdown, /Site navigation|Breadcrumb navigation|Site footer|Hidden copy|Decorative copy|Next slide|Do not expose fields|secretScript|private-style|<table/);
});

test('cards and nested accordion headings become readable Markdown rather than layout-shaped links', () => {
  const markdown = htmlToAgentMarkdown('<html><head><title>Cars</title></head><body><main><h1>Cars</h1><a href="/car/"><img src="/car.webp" alt="Car side view"><h2>Car name</h2><p>2026 · Electric</p></a><details><summary><h2>Specifications</h2></summary><p>5 seats</p></details><p><strong>80+</strong><span>Countries</span></p><p><a href="#sources">Sources</a><time>Reviewed today</time></p><label>Quantity<input value="1"></label><label>Destination country<input></label></main></body></html>', 'https://keeyakauto.com/');
  assert.match(markdown, /## \[Car name\]\(https:\/\/keeyakauto\.com\/car\/\)/);
  assert.match(markdown, /\n## Specifications\n/);
  assert.doesNotMatch(markdown, /### ##|\[\n\n/);
  assert.match(markdown, /\*\*80\+\*\* Countries/);
  assert.match(markdown, /\) Reviewed today/);
  assert.match(markdown, /Quantity\n\nDestination country/);
});
