from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    username = models.CharField(verbose_name="用户名", max_length=18,unique=True)
    password = models.CharField(verbose_name="密码", max_length=128)
    mobile = models.CharField(max_length=11, verbose_name="手机号")
    qq = models.CharField(max_length=11, verbose_name="QQ号")
    avator_sor = models.ImageField(upload_to="avator/%Y%m%d/", default="avator/default.png", verbose_name="头像")

    class Meta:
        verbose_name = '用户类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username