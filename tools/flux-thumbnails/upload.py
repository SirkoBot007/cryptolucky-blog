import requests

for k in ['casino', 'mundial', 'bonos']:
    with open('thumbs/' + k + '.png', 'rb') as f:
        r = requests.post('https://tmpfiles.org/api/v1/upload', files={'file': f}, timeout=120)
    try:
        url = r.json()['data']['url']
    except Exception:
        url = r.text[:200]
    print(k, '->', url)
