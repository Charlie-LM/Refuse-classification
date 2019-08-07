from django.db import models

# Create your models here.
class UserInfo():
    username = models.CharField(verbose_name="用户名", max_length=18)
    password = models.CharField(verbose_name="密码", max_length=128)
    mobile = models

class News(models.Model):
    title = models.CharField(max_length=200,verbose_name="标题",unique=True)
    description = models.TextField(verbose_name="概括描述")
    time = models.CharField(max_length=20,verbose_name="时间")
    author = models.CharField(max_length=20,verbose_name="作者")
    content = models.TextField(verbose_name="新闻内容")

    class Meta:
        verbose_name = '新闻类'
        verbose_name_plural = verbose_name
        ordering = ['-title', ]

    def __str__(self):
        return self.title

class Interest(models.Model):
    title = models.CharField(max_length=200, verbose_name="标题", unique=True)
    time = models.DateTimeField(auto_now_add=True)
    content = models.TextField(verbose_name="段子内容")
    avator = models.ImageField(upload_to='avator/', default='imgs/default.png',)

    class Meta:
        verbose_name = '段子类'
        verbose_name_plural = verbose_name
        ordering = ['-title', ]

    def __str__(self):
        return self.title

