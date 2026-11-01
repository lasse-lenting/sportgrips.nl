import json,datetime,urllib.request,urllib.error
from pathlib import Path
from bs4 import BeautifulSoup
out=Path(__file__).resolve().parent
baseline=json.loads((out.parent/'route-inventory.json').read_text())
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
checks=[]
for entry in baseline['routes']:
 if entry['role'] not in ('active-maaistro','legacy-paspoot') and entry['path'] not in ['/volunteer','/projects','/events','/blogs','/blogs/klm','/events/klm','/projects/reistas-hond-vliegtuig-klm-afmetingen-46x28x24cm']:continue
 path=entry['path'];expected=200 if entry['role']=='active-maaistro' else 404
 try:
  try:response=opener.open('http://localhost:3000'+path,timeout=45)
  except urllib.error.HTTPError as e:response=e
  html=response.read().decode('utf-8','replace');soup=BeautifulSoup(html,'html.parser')
  checks.append({'path':path,'expected_status':expected,'actual_status':response.code,'pass':response.code==expected,'canonical':next((x.get('href') for x in soup.select('link[rel="canonical"]')),None),'robots':next((x.get('content') for x in soup.select('meta[name="robots"]')),None),'location':response.headers.get('Location'),'title':soup.title.get_text() if soup.title else None})
 except Exception as e:checks.append({'path':path,'expected_status':expected,'pass':False,'error':str(e)})
 print(path,checks[-1].get('actual_status',checks[-1].get('error')),flush=True)
result={'collected_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'After local route-removal edits, development server only, not production deployment','checks':checks,'all_pass':all(x['pass'] for x in checks)}
(out/'local-route-check.json').write_text(json.dumps(result,indent=2,ensure_ascii=False))
print('ALL PASS:',result['all_pass'],flush=True)
