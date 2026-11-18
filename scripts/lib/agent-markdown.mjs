import {parseHTML} from 'linkedom';
import TurndownService from 'turndown';
import gfm from 'turndown-plugin-gfm';

export function htmlToAgentMarkdown(html, canonical) {
  const {document} = parseHTML(html);
  const main = document.querySelector('main');
  if (!main) throw new Error(`No main content: ${canonical}`);
  const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map(script => JSON.parse(script.textContent));
  const metadata = {
    title: document.querySelector('meta[name="title"]')?.getAttribute('content') || document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    url: canonical,
    image: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
  };
  const content = main.cloneNode(true);
  for (const node of content.querySelectorAll('script, style, nav, template, noscript, svg, iframe, canvas, button, input, select, textarea, [hidden], [inert], [aria-hidden="true"], [role="dialog"]')) node.remove();
  for (const image of content.querySelectorAll('img[alt=""]')) image.remove();
  for (const node of content.querySelectorAll('strong, a, span, time')) {
    if (node.nextSibling?.nodeType === 1) node.after(document.createTextNode(' '));
  }
  for (const node of content.querySelectorAll('a[href], img[src]')) {
    const attribute = node.localName === 'a' ? 'href' : 'src';
    const value = node.getAttribute(attribute);
    try {
      const target = new URL(value, canonical);
      if (['http:', 'https:', 'mailto:', 'tel:'].includes(target.protocol)) node.setAttribute(attribute, target.href);
      else if (node.localName === 'a') node.removeAttribute(attribute);
      else node.remove();
    } catch { node.removeAttribute(attribute); }
  }
  const converter = new TurndownService({headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced'});
  converter.use([gfm.tables, gfm.strikethrough]);
  converter.addRule('summary', {filter: 'summary', replacement: value => `\n\n${/^\s*#{1,6}\s/.test(value) ? value.trim() : '### ' + value.trim()}\n\n`});
  converter.addRule('formLabel', {filter: 'label', replacement: value => `\n\n${value.trim()}\n\n`});
  converter.addRule('linkedCard', {
    filter: node => node.nodeName === 'A' && node.hasAttribute('href') && !!node.querySelector('h1,h2,h3,h4,h5,h6'),
    replacement(value, node) {
      const href = node.getAttribute('href').replaceAll('(', '%28').replaceAll(')', '%29');
      const linked = value.trim().replace(/^(#{1,6}) (.+)$/m, (_, level, title) => `${level} [${title}](${href})`);
      return `\n\n${linked}\n\n`;
    },
  });
  converter.addRule('definitionTerm', {filter: 'dt', replacement: value => `\n\n**${value.trim()}**\n\n`});
  converter.addRule('definitionValue', {filter: 'dd', replacement: value => `\n\n${value.trim()}\n\n`});
  // The GFM plugin needs HTMLTableElement.rows/cells from Turndown's parser.
  const body = converter.turndown(content.innerHTML).replace(/\n{3,}/g, '\n\n').trim();
  if (!body) throw new Error(`Empty main content: ${canonical}`);
  const frontmatter = Object.entries(metadata).filter(([,value]) => value).map(([key,value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  const structured = schema.length ? `\n\n## Structured data\n\n\`\`\`json\n${JSON.stringify(schema.length === 1 ? schema[0] : schema, null, 2)}\n\`\`\`` : '';
  return `---\n${frontmatter}\n---\n\n${body}${structured}\n`;
}
