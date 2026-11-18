import assert from 'node:assert/strict';
import {readFile, writeFile, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {encode} from 'gpt-tokenizer/encoding/o200k_base';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = process.env.MARKDOWN_TEST_ORIGIN || 'http://127.0.0.1:8789';
const dist = process.env.MARKDOWN_TEST_BUILD || path.join(root, 'dist');
const manifestPath = process.env.MARKDOWN_TEST_MANIFEST || path.join(root, 'server/agent-markdown.generated.json');
const manifestText = await readFile(manifestPath, 'utf8');
const pages = JSON.parse(manifestText);
const sitemap = JSON.parse(await readFile(process.env.MARKDOWN_TEST_SITEMAP_REPORT || path.join(root, '.local/seo/sitemap-build.json'), 'utf8'));
assert.deepEqual(Object.keys(pages).sort(), sitemap.urls.map(url => new URL(url).pathname).sort(), 'Every canonical page needs a representation');
const report = {origin, manifestSha256: createHash('sha256').update(manifestText).digest('hex'), pages: [], negotiation: [], excluded: [], redirects: []};
const get = (pathname, accept, options = {}) => fetch(new URL(pathname, origin), {...options, redirect: 'manual', headers: {Accept: accept, ...options.headers}});
for (const [pathname, page] of Object.entries(pages)) {
  const html = await get(pathname, 'text/html');
  assert.equal(html.status, 200, pathname);
  assert.match(html.headers.get('Content-Type'), /^text\/html/);
  assert.match(html.headers.get('Vary'), /\bAccept\b/i);
  const htmlBody = await html.text();
  assert.equal(htmlBody, await readFile(path.join(dist, '.' + decodeURIComponent(pathname), 'index.html'), 'utf8'), pathname + ': default HTML changed');
  const markdown = await get(pathname, 'text/markdown');
  assert.equal(markdown.status, 200, pathname);
  assert.equal(markdown.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(markdown.headers.get('Vary'), /\bAccept\b/i);
  assert.equal(markdown.headers.get('Content-Location'), page.canonical);
  assert.equal(markdown.headers.get('ETag'), page.etag);
  assert.equal(markdown.headers.get('X-Markdown-Tokens'), String(page.tokens));
  assert.equal(markdown.headers.get('X-Markdown-Tokenizer'), 'o200k_base');
  assert.equal(markdown.headers.get('X-Content-Type-Options'), html.headers.get('X-Content-Type-Options'));
  assert.equal(markdown.headers.get('Referrer-Policy'), html.headers.get('Referrer-Policy'));
  const body = await markdown.text();
  assert.equal(body, await readFile(path.join(dist, page.asset), 'utf8'), pathname + ': Markdown body');
  assert.equal(encode(body).length, page.tokens, pathname + ': actual response token count');
  assert.match(body, /^---\ntitle: /);
  assert.match(body, /^# .+/m, pathname + ': missing H1');
  const content = body.split('## Structured data')[0];
  assert.doesNotMatch(content, /<\/?(?:html|head|script|style|svg|nav|footer|table)\b/i, pathname + ': raw layout HTML');
  const structured = body.match(/## Structured data\n\n```json\n([\s\S]+)\n```\n$/);
  if (htmlBody.includes('application/ld+json')) assert(structured, pathname + ': JSON-LD missing');
  if (structured) JSON.parse(structured[1]);
  report.pages.push({pathname, status: markdown.status, htmlBytes: Buffer.byteLength(htmlBody), markdownBytes: Buffer.byteLength(body), tokens: page.tokens});
}
assert(report.pages.length > 0);
for (const [accept, expected] of [
  ['*/*', 'text/html'], ['text/html,application/xhtml+xml,*/*;q=0.8', 'text/html'],
  ['text/markdown;q=0, text/html', 'text/html'], ['text/markdown;q=0.4, text/html;q=0.9', 'text/html'],
  ['text/markdown;q=0.9, text/html;q=0.4', 'text/markdown'], ['text/markdown, text/html', 'text/markdown'],
]) {
  const response = await get('/', accept);
  assert(response.headers.get('Content-Type').startsWith(expected), accept);
  await response.arrayBuffer();
  report.negotiation.push({accept, expected});
}
const example = '/export-services/buying-guide/how-to-buy-cars-from-china/';
const page = pages[example];
const head = await get(example, 'text/markdown', {method: 'HEAD'});
assert.equal(head.status, 200);
assert.equal(head.headers.get('X-Markdown-Tokens'), String(page.tokens));
assert.equal(await head.text(), '');
const conditional = await get(example, 'text/markdown', {headers: {'If-None-Match': page.etag}});
assert.equal(conditional.status, 304);
assert.equal(await conditional.text(), '');
assert.match(conditional.headers.get('Vary'), /\bAccept\b/i);
const html = await get(example, 'text/html');
const htmlEtag = html.headers.get('ETag');
await html.arrayBuffer();
for (const [accept, etag, expected] of [['text/html', page.etag, 200], ['text/markdown', htmlEtag, 200], ['text/html', htmlEtag, 304]]) {
  const response = await get(example, accept, {headers: {'If-None-Match': etag}});
  assert.equal(response.status, expected);
  assert.match(response.headers.get('Vary'), /\bAccept\b/i);
  await response.arrayBuffer();
}
const queried = await get(example + '?from=%2Fexport-services%2F&campaign=agent-test', 'text/markdown');
assert.equal(queried.status, 200);
assert.equal(await queried.text(), await readFile(path.join(dist, page.asset), 'utf8'));
report.headAndConditional = 'PASS';
const css = (await readdir(path.join(dist, '_astro'))).find(name => name.endsWith('.css'));
for (const [pathname, status, type] of [
  ['/admin/', 200, 'text/html'], ['/api/admin/session/', 401, 'application/json'],
  ['/robots.txt', 200, 'text/plain'], ['/sitemap.xml', 200, 'application/xml'],
  ['/rss.xml', 200, 'application/rss+xml'], ['/_astro/' + css, 200, 'text/css'],
  ['/this-markdown-test-page-does-not-exist/', 404, 'text/html'],
  [page.asset, 404, 'text/plain'], [page.asset.replace('/_agent-markdown/', '/%5Fagent-markdown/'), 404, 'text/plain'],
]) {
  const response = await get(pathname, 'text/markdown');
  assert.equal(response.status, status, pathname);
  assert(response.headers.get('Content-Type').startsWith(type), pathname);
  assert.equal(response.headers.get('X-Markdown-Tokens'), null, pathname);
  await response.arrayBuffer();
  report.excluded.push({pathname, status});
}
const redirects = (await readFile(path.join(dist, '_redirects'), 'utf8')).split(/\r?\n/).filter(line => line.trim() && !line.startsWith('#'));
for (const line of redirects) {
  const [pathname, destination, status = '302'] = line.trim().split(/\s+/);
  const response = await get(pathname, 'text/markdown');
  assert.equal(response.status, Number(status), pathname);
  assert.equal(new URL(response.headers.get('Location'), origin).href, new URL(destination, origin).href, pathname);
  await response.arrayBuffer();
  report.redirects.push({pathname, destination, status: response.status});
}
assert.equal(await readFile(manifestPath, 'utf8'), manifestText, 'Build changed during verification; repeat against a stable build.');
report.result = 'PASS';
report.htmlBytes = report.pages.reduce((sum, page) => sum + page.htmlBytes, 0);
report.markdownBytes = report.pages.reduce((sum, page) => sum + page.markdownBytes, 0);
await writeFile(process.env.MARKDOWN_TEST_REPORT || path.join(root, '.local/seo/markdown-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({result: report.result, pages: report.pages.length, negotiationCases: report.negotiation.length, protectedAndStaticCases: report.excluded.length, redirects: report.redirects.length, htmlBytes: report.htmlBytes, markdownBytes: report.markdownBytes}, null, 2));
