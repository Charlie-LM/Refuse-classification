from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^mobile_captcha/$', views.get_mobile_captcha, name="mobile_captcha"),
    url(r'^get_captcha/$', views.get_captcha, name='get_captcha'),
    url(r'^check_captcha/$', views.check_captcha, name='check_captcha'),
    url(r'^change_avator/$', views.ChangeAvator.as_view(), name='change_avator'),
    url(r'^change_passwd/$',views.ChangePasswdView.as_view(),name='change_passwd')
]