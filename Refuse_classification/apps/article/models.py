from django.db import models

class News(models.Model):
    news_id = models.CharField(max_length=20, verbose_name="新闻id", unique=True)
    title = models.CharField(max_length=200, verbose_name="标题", unique=True)
    description = models.TextField(verbose_name="概括描述")
    time_time = models.CharField(max_length=50, verbose_name="时间")
    author = models.CharField(max_length=200, verbose_name="作者")
    content = models.TextField(verbose_name="新闻内容")
    from_from = models.CharField(max_length=200, verbose_name="来源")
    news_url = models.CharField(max_length=50, verbose_name="新闻url", unique=True)

    class Meta:
        verbose_name = '新闻类'
        verbose_name_plural = verbose_name
        ordering = ['-news_id', ]

    def __str__(self):
        return self.title

class Interest(models.Model):
    vd_id = models.IntegerField(verbose_name="视频id", unique=True)
    time = models.DateTimeField(auto_now_add=True)
    title = models.TextField(verbose_name="视频标题")
    avator = models.ImageField(upload_to='avator/', default='imgs/default.png',)

    class Meta:
        verbose_name = '视频类'
        verbose_name_plural = verbose_name
        ordering = ['-vd_id']

    def __str__(self):
        return self.title

