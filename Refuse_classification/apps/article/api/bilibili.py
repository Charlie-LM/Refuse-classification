import requests
import json
import pprint
import time
import random
import re
import os,django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Refuse_classification.settings")  # project_name 项目名称
django.setup()

header = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
}
list0 = []

for page in range(1,20):
    url = 'https://api.bilibili.com/x/web-interface/search/type?jsonp=jsonp&&search_type=video&highlight=1&keyword=垃圾分类搞笑视频&page=' + str(
        page)
    res = requests.get(url, headers=header)
    html = res.content.decode('raw_unicode_escape')
    html_new = json.loads(html, encoding='utf-8')


    for i in range(len(html_new['data']['result'])):
        aid = html_new['data']['result'][i]['aid']
        pic = html_new['data']['result'][i]['pic']

        title0 = html_new['data']['result'][i]['title']
        title = re.sub(r'<em class=\"keyword\">|</em>',"",title0)

        list0.append({'aid': aid, 'pic': pic, 'title': title})
    time.sleep(random.randint(4,6))
pprint.pprint(list0)
# pprint.pprint(aid)
# pprint.pprint(arcurl)
# pprint.pprint(pic)
# pprint.pprint(title)
