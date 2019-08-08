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
for i in range(2):
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
    content = soup.find_all(class_='edits')
    abstrat = soup.select('.edits > p')[0]  # 获取短暂描述

    # 获取大标题
    title = soup.find_all(class_='articleTit')[0]

    # 获取时间与作者
    time_autor = soup.find_all(class_='articleInfo cleargap')
    [s.extract() for s in time_autor[0]("a")]

    time_time = soup.find_all(class_='ibox time')[0]
    from_from = soup.find_all(class_='ibox from')[0]
    author = soup.find_all(class_='ibox author')[0]
    # 将三类数据加入一个列表
    list_all_html.append([title, abstrat, time_time, author, content, from_from])
    time.sleep(random.randint(3,6))
n = 1
for i in list_all_html:
    try:
        News.objects.create(title=str(i[0]), description=str(i[1]), time_time=str(i[2]), author=str(i[3]),
                        content=str(i[4]), from_from=str(i[5]))
        print(f'第{n}条数据写入成功')
        n = n + 1
    except:
        print("重复数据")
# print(list_all_html[0])

# print(News.objects.get(title="women"))
