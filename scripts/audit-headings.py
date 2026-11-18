"""Inventory rendered page titles and headings without changing source content."""
import argparse
import collections
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class HeadingParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.headings = []
        self.title = ''
        self.current = None
        self.redirect = False
        self.og_title = ''

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.redirect |= attrs.get('http-equiv', '').lower() == 'refresh'
            if attrs.get('property') == 'og:title':
                self.og_title = attrs.get('content', '')
        if tag in ('title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.current = {'tag': tag, 'text': '', 'id': attrs.get('id'), 'class': attrs.get('class'), 'inMain': any(t == 'main' for t, a in self.stack)}
        if tag == 'br' and self.current is not None:
            self.current['text'] += ' '
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append((tag, attrs))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.current is not None:
            self.current['text'] += data

    def handle_endtag(self, tag):
        if self.current is not None and self.current['tag'] == tag:
            item = self.current
            item['text'] = re.sub(r'\s+', ' ', item['text']).strip()
            if tag == 'title':
                self.title = item['text']
            else:
                self.headings.append(item)
            self.current = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break


def inventory(dist):
    pages = []
    for path in sorted(dist.rglob('*.html')):
        rel = path.relative_to(dist).as_posix()
        if rel.startswith(('design/', 'design-preview/', 'admin/')):
            continue
        parser = HeadingParser()
        parser.feed(path.read_text(encoding='utf-8'))
        if parser.redirect:
            continue
        route = '/' + rel.removesuffix('index.html') if rel.endswith('index.html') else '/' + rel
        pages.append({'route': route, 'title': parser.title, 'ogTitle': parser.og_title, 'headings': parser.headings})
    return pages


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dist', default='dist')
    ap.add_argument('--out', required=True)
    args = ap.parse_args()
    pages = inventory(Path(args.dist))
    title_counts = collections.Counter(p['title'] for p in pages)
    issues = []
    for page in pages:
        h1 = [h for h in page['headings'] if h['tag'] == 'h1' and h['inMain']]
        checks = []
        if not page['title']: checks.append('empty-title')
        if len(page['title']) > 70: checks.append('long-title')
        if title_counts[page['title']] > 1: checks.append('duplicate-title')
        if len(h1) != 1: checks.append('main-h1-count')
        if any(not h['text'] for h in page['headings']): checks.append('empty-heading')
        if any('…' in h['text'] or '...' in h['text'] for h in page['headings']): checks.append('heading-ellipsis')
        if checks: issues.append({'route': page['route'], 'issues': checks, 'title': page['title'], 'h1Count': len(h1)})
    summary = {'pageCount': len(pages), 'headingCount': sum(len(p['headings']) for p in pages), 'uniqueHeadings': len({h['text'] for p in pages for h in p['headings']}), 'issues': issues}
    output = Path(args.out)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({'summary': summary, 'pages': pages}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
