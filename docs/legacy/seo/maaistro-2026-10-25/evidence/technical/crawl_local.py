"""Read-only crawler of the user-authorized local Maaistro preview, fixed localhost origin only.
Bundled safe_http intentionally rejects private IPs; it is NOT modified. Its parse_html
is reused offline against saved HTML. This script never requests external links.
"""
import json,sys,re,hashlib,datetime,urllib.request,urllib.error
from pathlib import Path
from urllib.parse import urlparse,urljoin,urldefrag,unquote
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[5]
OUT=Path(__file__).resolve().parent
SKILL=ROOT/'docs/seo/maaistro-2026-10-25/skill-source'
sys.path.insert(0,str(SKILL/'scripts'))
from parse_html import parse_html
BASE='http://localhost:3000'
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*a,**kw): return None
opener=urllib.request.build_opener(NoRedirect)
records={}
def save(path,role):
 path=urldefrag(path)[0] or '/'
 if path in records:return records[path]
 assert urlparse(urljoin(BASE,path)).netloc=='localhost:3000'
 name=('home' if path=='/' else path.strip('/').replace('/','__'))
 name=re.sub(r'[^a-zA-Z0-9_.-]','_',name)
 try:
  try: r=opener.open(urllib.request.Request(BASE+path,headers={'User-Agent':'MaaistroLocalSEOAudit/1.0'}),timeout=60)
  except urllib.error.HTTPError as e:r=e
  body=r.read(); headers=dict(r.headers); status=r.code
  html='text/html' in headers.get('Content-Type','')
  file=OUT/'raw'/(name+('.html' if html else '.txt'))
  file.write_bytes(body)
  (OUT/'raw'/(name+'.headers.json')).write_text(json.dumps(headers,indent=2))
  record={'path':path,'role':role,'status':status,'headers':headers,'raw':str(file.relative_to(ROOT)),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()}
  if html:
   text=body.decode('utf-8','replace'); parsed=parse_html(text,BASE+path,headers=headers)
   soup=BeautifulSoup(text,'html.parser')
   # Preserve anchor checks independent of skill normalization and script text.
   record['ids']=[e.get('id') for e in soup.find_all(id=True)]
   record['anchors']=[{'href':e.get('href'),'text':e.get_text(' ',strip=True)} for e in soup.find_all('a',href=True)]
   for t in soup(['script','style']):t.decompose()
   record['body_text']=soup.get_text(' ',strip=True)
   record['seo']=parsed
   (OUT/'raw'/(name+'.parsed.json')).write_text(json.dumps(parsed,ensure_ascii=False,indent=2))
  records[path]=record
 except Exception as e: records[path]={'path':path,'role':role,'error':str(e)}
 print(path,records[path].get('status',records[path].get('error')),flush=True)
 return records[path]
active=['/','/advies','/over-maaistro','/privacy']+['/advies/'+d['slug'] for d in json.loads((ROOT/'src/content/advice.json').read_text())]
legacy=['/cabinecheck','/reistassen','/luchtvaartmaatschappijen','/over-paspoot','/nieuws']
legacy+=['/reistassen/'+d['slug'] for d in json.loads((ROOT/'src/content/projects.json').read_text())]
legacy+=['/luchtvaartmaatschappijen/'+d['slug'] for d in json.loads((ROOT/'src/content/events.json').read_text())]
legacy+=['/nieuws/'+d['slug'] for d in json.loads((ROOT/'src/content/news.json').read_text())]
for p in active:save(p,'active-maaistro')
for p in legacy:save(p,'legacy-paspoot')
for p in ['/robots.txt','/sitemap.xml','/llms.txt','/site.webmanifest','/bestaat-niet-seo-audit','/advies/bestaat-niet-seo-audit','/advies/hond-vliegtuig','/advies/robotmaaier-zonder-draad/','/volunteer','/projects','/projects/reistas-hond-vliegtuig-klm-afmetingen-46x28x24cm','/events','/events/klm','/blogs','/blogs/klm']:
 save(p,'discovery-or-redirect-test')
# Crawl all internal page links from known active and legacy pages, once. No assets or external URLs.
internal=set()
for r in list(records.values()):
 for a in r.get('anchors',[]):
  u=urlparse(urljoin(BASE+r['path'],a['href']))
  if u.netloc=='localhost:3000' and not u.path.startswith(('/_next/','/assets/')):internal.add(u.path or '/')
for p in sorted(internal):save(p,'linked-page')
issues=[]
for r in list(records.values()):
 if r.get('status')!=200 or 'anchors' not in r:continue
 for a in r['anchors']:
  u=urlparse(urljoin(BASE+r['path'],a['href']))
  if u.netloc!='localhost:3000':continue
  target=records.get(u.path or '/')
  if target and target.get('status',0)>=400: issues.append({'source':r['path'],'href':a['href'],'text':a['text'],'target_status':target['status'],'kind':'http'})
  elif u.fragment and target and target.get('status')==200 and unquote(u.fragment) not in target.get('ids',[]):issues.append({'source':r['path'],'href':a['href'],'text':a['text'],'kind':'missing-anchor'})
(OUT/'route-inventory.json').write_text(json.dumps({'base':BASE,'intended_domain':'https://maaistro.nl','collected_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'local Next.js development server, not public production','routes':list(records.values()),'internal_link_issues':issues},indent=2,ensure_ascii=False))
summary=[]
for r in records.values():
 s=r.get('seo',{})
 summary.append({'path':r['path'],'role':r['role'],'status':r.get('status'),'location':r.get('headers',{}).get('location',r.get('headers',{}).get('Location')),'title':s.get('title'),'canonical':s.get('canonical'),'meta_robots':s.get('meta_robots'),'x_robots_tag':s.get('x_robots_tag'),'h1':s.get('h1'),'word_count':s.get('word_count'),'error':r.get('error')})
(OUT/'route-summary.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False))
(OUT/'internal-link-issues.json').write_text(json.dumps(issues,indent=2,ensure_ascii=False))
print('Finished',len(records),'routes,',len(issues),'link/anchor issues',flush=True)
