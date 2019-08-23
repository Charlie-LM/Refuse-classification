from django.shortcuts import render, HttpResponse, redirect, reverse, render_to_response
from django.views.generic import View
from django.core.cache import cache
from django.contrib.auth.hashers import make_password
from django.contrib import auth
from django.http import JsonResponse
import logging
from .forms import RegisterForm, LoginForm
from .models import User,FindPassword
logger = logging.getLogger("account")

# Create your views here.
def test(request):
    return HttpResponse("帐户视图")


class Register(View):
    def get(self, request):
        form = RegisterForm()
        return render(request, "register.html", {"form":form})

    # Ajax提交表单
    def post(self, request):
        ret = {"status": 400, "msg": "调用方式错误"}
        # 检查是不是ajax的请求
        if request.is_ajax():
            form = RegisterForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data["username"]
                password = form.cleaned_data["password"]
                mobile = form.cleaned_data["mobile"]
                mobile_captcha = form.cleaned_data["mobile_captcha"]
                mobile_captcha_reids = cache.get(mobile)
                if mobile_captcha == mobile_captcha_reids:
                    user = User.objects.create(username=username, password=make_password(password))
                    user.save()
                    ret['status'] = 200
                    ret['msg'] = "注册成功"
                    logger.debug(f"新用户{user}注册成功！")
                    user = auth.authenticate(username=username, password=password)
                    if user is not None and user.is_active:
                        auth.login(request, user)
                        logger.debug(f"新用户{user}登录成功")
                    else:
                        logger.error(f"新用户{user}登录失败")
                else:
                    # 验证码错误
                    ret['status'] = 401
                    ret['msg'] = "验证码错误或过期"
            else:
                ret['status'] = 402
                ret['msg'] = form.errors
        logger.debug(f"用户注册结果：{ret}")
        return JsonResponse(ret)

"""
HttpResonse
JsonResponse
render => 执行context_processors=> messages, request
render_to_response => 不会执行context_processors
"""
class Login(View):
    def get(self, request):
        # 设置下一跳转地址(如果get有next，如果没有跳转到repo:index)
        request.session["next"] = request.GET.get('next', reverse('article:index'))
        # 如果已登录，则直接跳转到index页面
        # request.user 表示的是当前登录的用户对象,没有登录 `匿名用户`
        if request.user.is_authenticated:
            return redirect(request.session["next"])
        form = LoginForm()
        return render(request, "login.html", {"form":form})
        # return render_to_response("login.html", {"form":form})


    # Form表单直接提交
    def post(self, request):
        ret={"code":400,"msg":"调用方式错误"}
        if request.is_ajax():
            # 表单数据绑定
            form = LoginForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data["username"]
                captcha = form.cleaned_data["captcha"]
                session_captcha_code = request.session.get("captcha_code", "")
                logger.debug(f"登录提交验证码:{captcha}-{session_captcha_code}")
                # 验证码一致
                print(captcha.lower(), session_captcha_code.lower())
                if captcha.lower() == session_captcha_code.lower():
                    user, flag = form.check_password()
                    # user = auth.authenticate(username=username, password=password)
                    if flag and user and user.is_active:
                        auth.login(request, user)
                        logger.info(f"{user.username}登录成功")
                        ret["code"] = 200
                        ret["msg"] = "登录成功"
                        # 跳转到next
                        return JsonResponse(ret)
                    ret["code"] = 402
                    ret["msg"] = "用户名或密码错误"
                    logger.error(f"{username}登录失败, 用户名或密码错误")
                else:
                    ret["code"] = 401
                    ret["msg"] = "验证码错误"
                    logger.error(f"{username}登录失败, 验证码错误")
            else:
                ret["msg"] = form.errors
                logger.error(ret["msg"])
        return JsonResponse(ret)


def logout(request):
    auth.logout(request)
    return redirect(reverse("article:index"))

import random
import string
from django.core.mail import send_mail

class PasswordForget(View):
    def post(self, request):
        email = request.POST.get("email")
        if email and User.objects.filter(email=email):
            verify_code = "".join(random.choices(string.ascii_lowercase + string.digits, k=128))
            url = f"{request.scheme}://{request.META['HTTP_HOST']}/accounts/password/reset/{verify_code}?email={email}"
            ret = FindPassword.objects.get_or_create(email=email)
            # (<FindPassword: FindPassword object>, True)
            ret[0].verify_code = verify_code
            ret[0].status = False
            ret[0].save()
            send_mail('注册用户验证信息', url, None, [email])
            msg = {'code': 200, 'msg': "邮件发送成功，请登录邮箱查看！"}
            return JsonResponse(msg)
        else:
            msg = {'code': 404, 'msg': "输入的邮箱不存在！"}
            return JsonResponse(msg)

class PasswordReset(View):
    def get(self, request, verify_code):
        import datetime
        create_time_newer = datetime.datetime.utcnow()-datetime.timedelta(minutes=30)
        email = request.GET.get("email")
        # 邮箱、verify_code、status=False、时间近30分钟
        find_password = FindPassword.objects.filter(status=False, verify_code=verify_code, email=email, creat_time__gte=create_time_newer)
        # great_then_equal, lte, lt, gt
        if verify_code and find_password:
            return render(request, "password_reset.html")
        else:
            return HttpResponse("链接失效或有误")

    def post(self, request, verify_code):
        import datetime
        create_time_newer = datetime.datetime.utcnow() - datetime.timedelta(minutes=30)
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        if len(password1.strip()) == 0:
            msg = "密码为空，重置失败"
        elif password2 == password1:
            try:
                find_password = FindPassword.objects.get(status=False, verify_code=verify_code, creat_time__gte=create_time_newer)
                user = User.objects.get(email=find_password.email)
                user.set_password(password1)
                user.save()
                msg = "重置密码成功，请登录"
                find_password.status = True
                find_password.save()
            except Exception as ex:
                # 记日志 ex
                msg = "出错啦"

        else:
            msg = "两次密码不一致，重置失败"
        return render(request, "password_reset.html", {"msg":msg})