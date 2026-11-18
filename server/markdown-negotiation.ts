export interface MarkdownPage {
  asset: string;
  canonical: string;
  etag: string;
  tokens: number;
}

export interface MarkdownContext {
  request: Request;
  env: {ASSETS: {fetch(request: Request): Promise<Response>}};
  next(request?: Request): Promise<Response>;
}

// Wildcards alone keep the browser default. An explicit q=0 excludes Markdown.
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const ranges = accept.split(',').map(part => {
    const [type, ...parameters] = part.trim().toLowerCase().split(';');
    const q = parameters.find(parameter => /^\s*q\s*=/.test(parameter));
    const raw = q?.split('=')[1]?.trim();
    const quality = raw === undefined ? 1 : /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw) ? Number(raw) : 0;
    return {type: type.trim(), quality};
  });
  const markdown = Math.max(0, ...ranges.filter(range => range.type === 'text/markdown').map(range => range.quality));
  if (markdown === 0) return false;
  const htmlRanges = ranges.filter(range => ['text/html', 'text/*', '*/*'].includes(range.type));
  const specificity = (type: string) => type === 'text/html' ? 2 : type === 'text/*' ? 1 : 0;
  const mostSpecific = Math.max(-1, ...htmlRanges.map(range => specificity(range.type)));
  const html = Math.max(0, ...htmlRanges.filter(range => specificity(range.type) === mostSpecific).map(range => range.quality));
  return markdown >= html;
}

export function varyOnAccept(headers: Headers): void {
  const vary = headers.get('Vary');
  if (vary?.split(',').some(value => ['accept', '*'].includes(value.trim().toLowerCase()))) return;
  headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
}

function matchesEtag(value: string | null, etag: string): boolean {
  return !!value?.split(',').some(candidate => candidate.trim() === '*' || candidate.trim().replace(/^W\//, '') === etag);
}

export async function negotiateMarkdown(context: MarkdownContext, page: MarkdownPage): Promise<Response> {
  const {request} = context;
  if (!prefersMarkdown(request.headers.get('Accept'))) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    varyOnAccept(headers);
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  }

  // HTML validators and byte ranges cannot validate a different representation.
  const htmlHeaders = new Headers(request.headers);
  htmlHeaders.set('Accept', 'text/html');
  for (const name of ['If-None-Match', 'If-Modified-Since', 'If-Match', 'If-Unmodified-Since', 'Range', 'If-Range']) htmlHeaders.delete(name);
  const html = await context.next(new Request(request, {headers: htmlHeaders}));
  if (html.status !== 200 || !html.headers.get('Content-Type')?.toLowerCase().startsWith('text/html')) return html;

  const headers = new Headers(html.headers);
  varyOnAccept(headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Content-Location', page.canonical);
  headers.append('Link', `<${page.canonical}>; rel="canonical"`);
  headers.set('ETag', page.etag);
  headers.set('X-Markdown-Tokens', String(page.tokens));
  headers.set('X-Markdown-Tokenizer', 'o200k_base');
  for (const name of ['Content-Length', 'Content-Encoding', 'Content-Range', 'Transfer-Encoding', 'Last-Modified', 'Accept-Ranges']) headers.delete(name);

  if (matchesEtag(request.headers.get('If-None-Match'), page.etag)) {
    await html.body?.cancel();
    return new Response(null, {status: 304, headers});
  }
  const assetUrl = new URL(page.asset, request.url);
  const asset = await context.env.ASSETS.fetch(new Request(assetUrl, {method: request.method, headers: {Accept: 'text/plain'}}));
  if (asset.status !== 200) {
    // A missing generated asset must never disguise an error page as Markdown.
    const fallbackHeaders = new Headers(html.headers);
    varyOnAccept(fallbackHeaders);
    return new Response(html.body, {status: html.status, headers: fallbackHeaders});
  }
  await html.body?.cancel();
  return new Response(request.method === 'HEAD' ? null : asset.body, {status: 200, headers});
}
