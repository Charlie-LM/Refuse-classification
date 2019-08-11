from django.shortcuts import render
from .models import News
import hu
# Create your views here.
def index(request):
    return render(request,'index.html')


def news(request,id):
    cout = News.objects.all().count()
    ids=int(id)
    pages=hu.Pageinfo(id,cout,6,'/abc/')
    ss = News.objects.all().values_list()[pages.start():pages.end()]
    return rendewr(request,'News.html',{'ss':ss,'pagr':pages})


def interest(request):
    return render(request,'interest.html')

def base(request):
    return render(request,'base.html')
