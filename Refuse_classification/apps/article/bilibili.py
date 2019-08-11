import requests
import json
header = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
    }
url = "http://www.bilibili.com/video/av57763092"

res = requests.get(url,headers=header).content
html = json.loads(res)
print(html)
