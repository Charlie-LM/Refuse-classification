import requests
import json
import pprint
import time
import random
import re
import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Refuse_classification.settings")  # project_name 项目名称
django.setup()
from apps.article.models import Interest

header = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
}
n = 1
for page in range(1, 3):
    url = 'https://api.bilibili.com/x/web-interface/search/type?jsonp=jsonp&&search_type=video&highli' \
          'ght=1&keyword=垃圾分类搞笑视频&page=' + str(
        page)
    res = requests.get(url, headers=header)
    html = res.content.decode('raw_unicode_escape')
    html_new = json.loads(html, encoding='utf-8')

    for i in range(len(html_new['data']['result'])):
        aid = html_new['data']['result'][i]['aid']
        compare = Interest.objects.filter(vd_id=aid)
        if compare:
            print(f'重复数据{n}')
            n += 1
            continue
        else:
            pic ='https:'+ html_new['data']['result'][i]['pic']
            time_time = html_new['data']['result'][i]['duration']
            title0 = html_new['data']['result'][i]['title']
            title = re.sub(r'<em class=\"keyword\">|</em>', "", title0)
            Interest.objects.create(vd_id=aid, avator=pic, all_time=time_time, title=title)
            print(f'成功写入第{n}条数据')
            n += 1
    time.sleep(random.randint(6, 8))
# pprint.pprint(aid)
# pprint.pprint(arcurl)
# pprint.pprint(pic)
# pprint.pprint(title)
