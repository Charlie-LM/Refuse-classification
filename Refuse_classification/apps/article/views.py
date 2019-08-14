from django.shortcuts import render
from .models import News
import hu
# Create your views here.
def index(request):
    return render(request,'index.html')


def news(request,id):
    count = News.objects.all().count() #查看数据库里面的所有数据
    ids=int(id)
    pages=hu.Pageinfo(ids,count,6,'/article/news/') #实例化实例
    ss = News.objects.all().values_list()[pages.start():pages.end()]
    return render(request,'News.html',{'ss':ss,'pages':pages})

def contents(request,id):
    contents = News.objects.get(news_id=id)
    return render(request,'contents.html',{'contents':contents})



def interest(request):
    id =58709988
    return render(request,'interest.html',{'id':id})

def base(request):
    return render(request,'base.html')
