from selenium import webdriver
from bs4 import BeautifulSoup
import time
import random
import requests
import re, os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Refuse_classification.settings")  # project_name 项目名称
django.setup()

from apps.article.models import News

i = 1
list_html_list = []
list_all_html = []
title = ''
abstrat = ''
time_time = ''
author = ''
content = ''
from_from = ''

# 创建对象并且打开目标网站
driver = webdriver.Firefox()
driver.get('http://www.chinaenvironment.com/search/index.aspx?nodeid=128&keyword=垃圾分类')

# 定义循环次数，点击“加载更多“按钮的次数,设置睡眠时间防止反爬
for i in range(1):
    driver.find_element_by_class_name('getMore').click()
    time.sleep(random.randint(3, 5))

# 获取网站url
soup = BeautifulSoup(driver.page_source, 'lxml')
# 截取特定class的块
class_ = soup.find_all(class_='hasPic hasPic_2 hasPic_3')

class_ = str(class_)
soup1 = BeautifulSoup(class_, 'lxml')
# 截取a标签
class_a = soup1.find_all('a')
# print(zzr2)

for item in class_a:  # 判定是否以..开头开头
    if str(item.get("href")).startswith('/zxxwlb'):
        list_html_list.append(item.get("href"))  # 将符合要求的加入到列表

#######################截取html完成######################
#######################循环爬网页开始#####################

for x in list_html_list:
    news_id = re.findall(r"/zxxwlb/index_55_(.*).html", x)
    try:
        news_url = "/article/contents/"+news_id[0]
    except:
        continue

    url = "http://www.chinaenvironment.com" + x
    header = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0'
    }
    res = requests.get(url, headers=header)

    res.encoding = 'utf-8'
    html = res.text
    # 获取正文
    soup = BeautifulSoup(html, 'lxml')
    content = soup.find_all(class_='edits')[0]

    # 获取短暂描述
    abstract0 = soup.select('.edits > p')[0]
    abstract = re.findall(r'<p>[\s\S]\s+(.*)[\s\S]</p>',str(abstract0))[0]

    # 获取大标题 只获取内容
    title0 = soup.find_all(class_='articleTit')[0]
    title = re.findall(r'<.*>(.*)<.*>',str(title0))[0]

    # 获取时间与作者
    time_autor = soup.find_all(class_='articleInfo cleargap')
    [s.extract() for s in time_autor[0]("a")]

    #获取时间，只获取内容
    time_time0 = soup.find_all(class_='ibox time')[0]
    time_time = re.findall(r'<.*>(.*)<.*>',str(time_time0))[0]

    from_from = soup.find_all(class_='ibox from')[0]
    author = soup.find_all(class_='ibox author')[0]

    # 将数据加入一个列表
    list_all_html.append(
        {'title': title, 'abstract': abstract, 'time_time': time_time, 'author': author, 'content': content,
         'from_from': from_from, 'news_id': news_id[0],'news_url':news_url})
    time.sleep(random.randint(3, 6))


n = 1
for i in list_all_html:
    try:
        News.objects.create(title=str(i['title']), description=str(i['abstract']), time_time=str(i['time_time']), author=str(i['author']),
                            content=str(i['content']), from_from=str(i['from_from']), news_id=str(i['news_id']),news_url=str(i['news_url']))
        print(f'第{n}条数据写入成功')
        n = n + 1

    except:
        print("重复数据")
# print(list_all_html[0])

# print(News.objects.get(title="women"))
