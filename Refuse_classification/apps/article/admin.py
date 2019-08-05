from django.contrib import admin
from .models import Interest,News
# Register your models here.
# class EntryAdmin(admin.ModelAdmin):
#     # 列表页显示的字段
#     list_display = ['blog', 'n_comments', 'n_pingbacks', "rating"]
#     # 可直接点击进入修改页面(以下的字段一定要出现在list_display中)
#     list_display_links = ('n_pingbacks',)
#     # 可在列表页直接修改（链接和编辑不能同时用）
#     list_editable = ('rating',)
#     # 右侧过滤器
#     list_filter = ('authors','n_pingbacks')
#     # 搜索框
#     search_fields = ('authors__name',)
#     # search_fields = ('authors',)

admin.site.register(Interest)
admin.site.register(News)