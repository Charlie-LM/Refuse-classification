"""Refuse_classification URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, handler404, handler500
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
import re
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('apps.accounts.urls', namespace='accounts')),
    url(r'^article/', include('apps.article.urls', namespace='article')),
    url(r'^search/', include('apps.search.urls', namespace='search')),
    url(r'^reviews/', include('apps.reviews.urls', namespace='reviews')),
    url(r'^apis/', include('apps.apis.urls', namespace="apis")),
    # url(r'^base/$', include('apps.urls', namespace='base')),
    url(r'^%s(?P<path>.*)$' % re.escape(settings.STATIC_URL.lstrip('/')), serve,
        {"document_root": settings.STATIC_ROOT}),
    url(r'^media/(?P<path>.*)$', serve, {"document_root": settings.MEDIA_ROOT}),
    url(r'^deliver$',TemplateView.as_view(template_name='deliver.html'),name='deliver')
]

handler404 = views.my404
