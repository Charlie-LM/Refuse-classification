from django import forms
from . import models


class RegisterForm(forms.ModelForm):
    password = forms.CharField(label="密码",max_length=18, widget=forms.PasswordInput)
    password2 = forms.CharField(label="确认密码",max_length=18, widget=forms.PasswordInput)

