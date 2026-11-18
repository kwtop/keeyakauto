import generatedPages from '../server/agent-markdown.generated.json';
import {negotiateMarkdown, type MarkdownPage, type MarkdownContext} from '../server/markdown-negotiation';

const pages: Record<string, MarkdownPage> = generatedPages;

export const onRequest = async (context: MarkdownContext): Promise<Response> => {
  const url = new URL(context.request.url);
  let pathname: string;
  try { pathname = decodeURIComponent(url.pathname); } catch { return context.next(); }
  // These are implementation assets, not additional public document URLs.
  if (pathname === '/_agent-markdown' || pathname.startsWith('/_agent-markdown/')) {
    return new Response(context.request.method === 'HEAD' ? null : 'Not found', {status: 404, headers: {'Content-Type': 'text/plain; charset=utf-8'}});
  }
  if (!['GET', 'HEAD'].includes(context.request.method) || /^\/(?:api|admin)(?:\/|$)/.test(pathname)) return context.next();
  const page = pages[url.pathname];
  if (!page) return context.next();
  return negotiateMarkdown(context, page);
};
