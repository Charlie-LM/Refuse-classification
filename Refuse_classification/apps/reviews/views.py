from django.shortcuts import render
from django.http import JsonResponse
from .models import Says, Comments
from apps.accounts.models import User
# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View


class Reviews(LoginRequiredMixin, View):
    def post(self, request):
        result = {}
        if request.is_ajax:
            username = request.user.username #发表的人名
            print("发表的人是： ", username)
            if request.POST.get('say_id'):
                print('获取到了say_id:', request.POST.get('say_id'))
                content = request.POST.get('ohval1') #发表的内容
                create_time = request.POST.get('now') #发表的时间

                user = User.objects.get(username=username) #发表的人的对象
                beusername = request.POST.get('oHfName').strip() #被评论的人
                beuser = User.objects.get(username=beusername) #被评论的人的对象

                #被评论的说说对象
                say_id = Says.objects.get(id=request.POST.get('say_id'))
                print(say_id)
                try:
                    Comments.objects.create(comments=content, says_comments=say_id, beuser_id=beuser,
                                            user_id=user)
                    result = {'status': True, 'content': content, 'create_time': create_time, 'username': username,
                              'beuser': beusername}
                except:
                    result = {'status': False, 'content': content, 'create_time': create_time, 'username': username,
                              'beuser': beusername}

            else:
                content = request.POST.get('osize')
                pic = request.POST.get('pic', "")
                create_time = request.POST.get('now')

                # print(result)
                user_id = User.objects.get(username=username)
                # print(user_id)
                try:
                    Says.objects.create(user_id=user_id, content=content, pic=pic)
                    result = {'status': True, 'content': content, 'username': username, 'create_time': create_time}
                except:
                    result = {'status': False, 'content': content, 'username': username, 'create_time': create_time}
        return JsonResponse(result)

    def get(self, request):
        result = []
        says = Says.objects.all().order_by('-creat_time')
        # print(says)
        for say in says:
            say_dict = {}
            say_dict['say_id'] = say.id
            say_dict['create_time'] = say.creat_time
            say_dict['content'] = say.content
            say_dict['username'] = say.user_id.username
            say_comments_list = []
            comments = Comments.objects.filter(says_comments_id=say.id).all().order_by('-creat_time')
            if comments:
                for comment in comments:
                    say_comment_dict = {}
                    say_comment_dict['content'] = comment.comments
                    say_comment_dict['create_time'] = comment.creat_time
                    say_comment_dict['username'] = comment.user_id.username
                    say_comment_dict['beusername'] = comment.beuser_id.username
                    say_comments_list.append(say_comment_dict)
                say_dict['comments'] = say_comments_list
            else:
                say_dict['comments'] = []
            result.append(say_dict)
        return render(request, 'reviews.html', {'result': result})
