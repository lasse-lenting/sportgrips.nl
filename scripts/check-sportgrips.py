#!/usr/bin/env python3
"""Checks the actual local HTTP output and the preserved source assets."""
import argparse,hashlib,json,re,sys,urllib.request,urllib.error
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,urljoin,unquote
from xml.etree import ElementTree
class Page(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.links=[];self.ids=set();self.canonical=[];self.h1=0;self.jsonld=[];self.text=[];self.in_script=False;self.ld=False;self.buffer='';self.title='';self.in_title=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True
  if tag=='script':self.in_script=True;self.ld=a.get('type')=='application/ld+json';self.buffer=''
 def handle_endtag(self,tag):
  if tag=='script':
   if self.ld:self.jsonld.append(json.loads(self.buffer))
   self.in_script=False;self.ld=False
  if tag=='title':self.in_title=False
 def handle_data(self,data):
  if self.ld:self.buffer+=data
  if self.in_title:self.title+=data
  if not self.in_script:self.text.append(data)
response_headers = {}
def fetch(url):
 try:
  with urllib.request.urlopen(url,timeout=30) as r:
   response_headers[url]=r.headers
   return r.status,r.read().decode()
 except urllib.error.HTTPError as e:return e.code,e.read().decode()
def check(base,production):
 failures=[];pages={};titles=set();descriptions=set();links=set()
 def require(cond,msg):
  if not cond:failures.append(msg)
 paths=['/','/grips/','/kennis/','/vergelijken/','/keuzehulp/','/over-sportgrips/','/privacy/']+[p['path'] for p in json.loads(Path('src/content/grips.json').read_text())]
 for path in paths:
  status,html=fetch(base+path);require(status==200,f'{path}: HTTP {status}')
  p=Page();p.feed(html);pages[path]=p
  require(p.h1==1,f'{path}: {p.h1} H1 elements')
  require('noindex' in p.meta.get('robots',''),f'{path}: noindex meta missing')
  require('noindex' in response_headers.get(base+path,{}).get('X-Robots-Tag',''),f'{path}: noindex HTTP header missing')
  require(p.canonical==['https://sportgrips.nl'+path],f'{path}: canonical {p.canonical}')
  require(p.meta.get('og:url')=='https://sportgrips.nl'+path,f'{path}: OG URL')
  require(p.meta.get('og:site_name')=='SPORTGRIPS',f'{path}: OG name')
  require(bool(p.meta.get('description')),f'{path}: description missing')
  require(p.title not in titles,f'{path}: duplicate title');titles.add(p.title)
  require(p.meta.get('description') not in descriptions,f'{path}: duplicate description');descriptions.add(p.meta.get('description'))
  require('SPORTGRIPS' in p.title,f'{path}: brand missing')
  require(not re.search(r'maaistro|paspoot|robotmaaier|gazon|tuin', ' '.join(p.text),re.I),f'{path}: legacy visible copy')
  require(bool(p.jsonld),f'{path}: JSON-LD missing')
  for schema in p.jsonld:
   raw=json.dumps(schema)
   require(not re.search(r'"(?:datePublished|dateModified|aggregateRating)"\s*:|"@type"\s*:\s*"(?:Offer|Product|AggregateRating)"|maaistro|paspoot',raw,re.I),f'{path}: unsubstantiated or legacy schema')
  for link in p.links:
   parsed=urlsplit(link)
   if not parsed.scheme or parsed.netloc in ['sportgrips.nl',urlsplit(base).netloc]:links.add((path,link))
 for source,link in links:
  target=urlsplit(urljoin('https://sportgrips.nl'+source,link));path=unquote(target.path)
  require(path in pages,f'{source}: unexpected internal link {link}')
  if path in pages and target.fragment:require(unquote(target.fragment) in pages[path].ids,f'{source}: missing anchor {link}')
 for path in ['/does-not-exist/','/robotmaaiers/','/advies/robotmaaier-zonder-draad/','/over-maaistro/','/golfgrips/golf-pride/','/golfgrips/does-not-exist/']:
  status,html=fetch(base+path);require(status==404,f'{path}: expected 404, got {status}')
  p=Page();p.feed(html);require('noindex' in p.meta.get('robots',''),f'{path}: 404 noindex missing');require('SPORTGRIPS' in ' '.join(p.text),f'{path}: 404 brand missing')
 status,xml=fetch(base+'/sitemap.xml');require(status==200,'sitemap HTTP')
 locations=[e.text for e in ElementTree.fromstring(xml).iter() if e.tag.endswith('loc')]
 require(not locations,'noindex sitemap should be empty')
 require('<lastmod>' not in xml,'sitemap inherited dates')
 status,robots=fetch(base+'/robots.txt');require(status==200,'robots HTTP')
 require('Sitemap:' not in robots and 'Allow: /' in robots and 'Disallow: /\n' not in robots,'robots must allow reading noindex without advertising sitemap')
 baseline=json.loads(Path('docs/seo/media-baseline.json').read_text());modified=[]
 for name,digest in baseline.items():
  p=Path('public')/Path(name).relative_to('public')
  require(p.exists(),f'{p}: deleted asset')
  if p.exists() and hashlib.sha256(p.read_bytes()).hexdigest()!=digest:modified.append(name)
 require(modified==['public/site.webmanifest'],f'Unexpected asset changes: {modified}')
 report={'base':base,'indexing':'noindex','mode':'production' if production else 'development','page_count':len(paths),'internal_links_checked':len(links),'public_files_preserved':len(baseline)-len(modified),'manifest_text_updated':modified,'failures':failures}
 Path('docs/seo/check-'+('production' if production else 'development')+'.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2));return bool(failures)
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://localhost:3027');parser.add_argument('--development',action='store_true');a=parser.parse_args();sys.exit(check(a.base.rstrip('/'),not a.development))
