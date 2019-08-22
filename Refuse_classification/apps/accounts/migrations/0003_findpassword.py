# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-08-22 19:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_qq'),
    ]

    operations = [
        migrations.CreateModel(
            name='FindPassword',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verify_code', models.CharField(max_length=128, verbose_name='验证码')),
                ('email', models.EmailField(max_length=254, verbose_name='邮箱')),
                ('creat_time', models.DateTimeField(auto_now=True, verbose_name='重置时间')),
                ('status', models.BooleanField(default=False, verbose_name='是否已重置')),
            ],
        ),
    ]
