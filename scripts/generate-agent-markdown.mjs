import {createHash} from 'node:crypto';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {encode} from 'gpt-tokenizer/encoding/o200k_base';
import {htmlToAgentMarkdown} from './lib/agent-markdown.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const report = JSON.parse(await readFile(path.join(root, '.local/seo/sitemap-build.json'), 'utf8'));
const folder = path.join(dist, '_agent-markdown');
await mkdir(folder, {recursive: true});
const pages = {};
let htmlBytes = 0, markdownBytes = 0;
for (const canonical of report.urls) {
  const url = new URL(canonical);
  if (/^\/(?:api|admin|design|design-preview|_qa)(?:\/|$)/.test(url.pathname)) throw new Error(`Non-public Markdown page: ${canonical}`);
  const source = path.resolve(dist, '.' + decodeURIComponent(url.pathname), 'index.html');
  if (!source.startsWith(dist + path.sep)) throw new Error('Source path is outside the build directory.');
  const html = await readFile(source, 'utf8');
  const markdown = htmlToAgentMarkdown(html, canonical);
  const digest = createHash('sha256').update(markdown).digest('hex');
  const asset = `/_agent-markdown/${digest}.md`;
  await writeFile(path.join(folder, digest + '.md'), markdown);
  pages[url.pathname] = {asset, canonical, etag: `"md-${digest}"`, tokens: encode(markdown).length};
  htmlBytes += Buffer.byteLength(html);
  markdownBytes += Buffer.byteLength(markdown);
}
await writeFile(path.join(root, 'server/agent-markdown.generated.json'), JSON.stringify(pages, null, 2) + '\n');

// Keep static asset delivery and existing Pages redirect rules outside Functions.
const authored = await readFile(path.join(dist, '_redirects'), 'utf8');
const redirectPaths = authored.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#')).map(line => line.split(/\s+/)[0]);
const exclude = [...new Set([
  '/_astro/*', '/images/*', '/fonts/*', '/downloads/*', '/admin', '/admin/*',
  '/design/*', '/design-preview/*', '/_qa/*', '/favicon*', '/robots.txt',
  '/sitemap.xml', '/sitemap-images.xml', '/rss.xml', ...redirectPaths,
])];
if (exclude.length > 95) throw new Error('Too many Pages routing exclusions; review the routing rules.');
await writeFile(path.join(dist, '_routes.json'), JSON.stringify({version: 1, include: ['/*'], exclude}, null, 2) + '\n');
await writeFile(path.join(root, '.local/seo/markdown-build.json'), JSON.stringify({pages: Object.keys(pages).length, htmlBytes, markdownBytes, tokenizer: 'o200k_base', excludedRoutes: exclude}, null, 2) + '\n');
console.log(`Agent Markdown: ${Object.keys(pages).length} public pages; ${htmlBytes.toLocaleString()} HTML bytes -> ${markdownBytes.toLocaleString()} Markdown bytes.`);
