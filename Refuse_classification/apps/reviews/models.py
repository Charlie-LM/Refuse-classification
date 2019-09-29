from django.db import models
from apps.accounts.models import User

# Create your models here.

class Says(models.Model):
    content = models.CharField(verbose_name="说说内容",max_length=200)
    creat_time = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User,verbose_name="发说说的用户",related_name='content_user')
    pic = models.ImageField(upload_to="avator/%Y%m%d/",verbose_name='图片',blank=True,null=True)

    class Meta:
        verbose_name = "说说"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user_id.username}:{self.content}"


class Comments(models.Model):
    comments = models.CharField(verbose_name="该评论内容",max_length=200)
    creat_time = models.DateTimeField(auto_now_add=True)
    beuser_id = models.ForeignKey(User,verbose_name="被评论的用户",related_name='comments_beuser')
    user_id = models.ForeignKey(User,verbose_name="该评论的用户",related_name='comments_user')
    says_comments = models.ForeignKey(Says,verbose_name='评论的说说',related_name='says_comments')

    class Meta:
        verbose_name = "评论"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user_id.username}:{self.beuser_id.username}:{self.comments}"
