from django.shortcuts import render, redirect
from .models import News, Interest
from django.views.generic import View
import hu
from django.http import JsonResponse
from django.db.models import Q
import pprint
from django.http import HttpResponseRedirect


# Create your views here.
def index(request):
    count = News.objects.all().count()  # 查看数据库里面的所有数据
    ids = 1
    pages = hu.Pageinfo(ids, count, 3, '/article/news/')  # 实例化实例
    ss = News.objects.all().values_list()[pages.start():pages.end()]
    return render(request, 'index.html', {'ss': ss, 'pages': pages})


def news(request, id):
    if request.method == 'GET':
        pkeyword = request.session.get('article_kword')
        everypage_num = 6
        ids = int(id)
        if pkeyword:
            news_list = News.objects.filter(Q(title__contains=pkeyword) | Q(description__contains=pkeyword))
            count = news_list.count()
        else:
            news_list = News.objects.all()
            count = news_list.count()  # 查看数据库里面的所有数据
        pages = hu.Pageinfo(ids, count, everypage_num, '/article/news/')  # 实例化实例
        news = news_list.values_list()[pages.start():pages.end()]
        return render(request, 'News.html', {'ss': news, 'pages': pages})
    else:
        pkeyword = request.POST.get('pkeyword')
        if pkeyword:
            request.session['article_kword'] = pkeyword
        else:
            request.session.clear()
        return HttpResponseRedirect('/article/news/1/')


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


def interest(request, id):
    if request.method == 'GET':
        pkeyword = request.session.get('interest_kword')
        everypage_num = 12
        ids = int(id)
        if pkeyword:
            interests_list = Interest.objects.filter(title__contains=pkeyword)
            count = interests_list.count()
        else:
            interests_list = Interest.objects.all()
            count = interests_list.count()  # 查看数据库里面的所有数据
        pages = hu.Pageinfo(ids, count, everypage_num, '/article/interest/')  # 实例化实例
        news = interests_list.values_list()[pages.start():pages.end()]
        return render(request, 'interesting.html', {'list0': news, 'pages_i': pages})
    else:
        pkeyword = request.POST.get('pkeyword')
        if pkeyword:
            request.session['interest_kword'] = pkeyword
        else:
            request.session.clear()
        return HttpResponseRedirect('/article/interest/1/')
    # count = Interest.objects.all().count()  # 查看数据库里面的所有数据
    # ids = int(id)
    # pages_i = hu.Pageinfo(ids, count, 12, '/article/interest/')  # 实例化实例
    # list0 = Interest.objects.all().values_list()[pages_i.start():pages_i.end()]
    # return render(request, 'interesting.html', {'list0': list0, 'pages_i': pages_i})


def interest_con(request, id):
    contents = Interest.objects.get(vd_id=id)
    return render(request, 'interest_con.html', {'contents': contents})


class Base(View):
    def get(self, request):
        return render(request, 'base.html')

    def post(self, request):
        ret_info = {"code": 400, "msg": "修改失败"}
        try:
            if request.POST.get("email") and len(request.POST.get('email').strip()) != 0:
                request.user.email = request.POST.get("email")
            else:
                ret_info["msg"] = "邮箱为空"
                return JsonResponse(ret_info)

            if request.POST.get("username") and len(request.POST.get('username').strip()) != 0:
                request.user.username = request.POST.get("username")
            else:
                ret_info["msg"] = "昵称为空"
                return JsonResponse(ret_info)

            if request.POST.get("mobile") and len(request.POST.get('mobile').strip()) != 0:
                request.user.mobile = request.POST.get("mobile")
            else:
                ret_info["msg"] = "手机为空"
                return JsonResponse(ret_info)

            if request.POST.get("qq") and len(request.POST.get('qq').strip()) != 0:
                request.user.qq = request.POST.get("qq")
            else:
                ret_info["msg"] = "QQ为空"
                return JsonResponse(ret_info)
            # if request.POST.get("email","mobile","qq","username"):
            ret_info = {"code": 200, "msg": "修改成功"}
            request.user.save()
        except Exception as ex:
            ret_info = {"code": 400, "msg": "修改失败"}
        return JsonResponse(ret_info)
