import requests

for k in ['casino', 'mundial', 'bonos']:
    with open('thumbs/' + k + '.png', 'rb') as f:
        r = requests.post(
            'https://catbox.moe/user/api.php',
            data={'reqtype': 'fileupload'},
            files={'fileToUpload': f},
            timeout=120,
        )
    print(k, '->', r.text.strip())
