import type {APIRoute} from 'astro';
import {companyEvents, eventHref} from '../data/companyNews';
import {escapeXml} from '../scripts/escape-xml.mjs';

export const GET: APIRoute = ({site, url}) => {
  const base = site ?? url;
  const newsUrl = escapeXml(new URL('/about/news/', base).href);
  const feedUrl = escapeXml(new URL('/rss.xml', base).href);
  const entries = [...companyEvents].sort((a, b) => b.date.localeCompare(a.date));

  // The archive records event dates, so the feed has no inferred publication dates.
  const items = entries.map(event => {
    const link = escapeXml(new URL(eventHref(event), base).href);
    return `    <item>
      <title>${escapeXml(event.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(event.summary)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KEEYAK News &amp; Events</title>
    <link>${newsUrl}</link>
    <description>Company news, exhibitions and events from KEEYAK.</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}});
};
