from django.shortcuts import render
from .models import News
import hu


# Create your views here.
def index(request):
    count = News.objects.all().count()  # 查看数据库里面的所有数据
    ids = 1
    pages = hu.Pageinfo(ids, count, 3, '/article/news/')  # 实例化实例
    ss = News.objects.all().values_list()[pages.start():pages.end()]
    return render(request, 'index.html', {'ss': ss, 'pages': pages})


def news(request, id):
    count = News.objects.all().count()  # 查看数据库里面的所有数据
    ids = int(id)
    pages = hu.Pageinfo(ids, count, 6, '/article/news/')  # 实例化实例
    ss = News.objects.all().values_list()[pages.start():pages.end()]
    return render(request, 'News.html', {'ss': ss, 'pages': pages})


def contents(request, id):
    contents = News.objects.get(news_id=id)
    contents_id = contents.id
    try:
        up_contents = News.objects.get(id=contents_id + 1)
    except:
        up_contents = contents
    try:
        down_contents = News.objects.get(id=contents_id - 1)
    except:
        down_contents = contents
    return render(request, 'contents.html',
                  {'contents': contents, 'up_contents': up_contents, 'down_contents': down_contents})


def interest(request):
    id =58709988
    return render(request,'interest.html',{'id':id})

def base(request):
    return render(request, 'base.html')
