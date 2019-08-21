from django.shortcuts import render
from .models import Says, Comments
from apps.accounts.models import User
# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View


class Reviews(LoginRequiredMixin,View):
    def post(self, request):
        result = {}
        if request.is_ajax:
            # print(request.user.username)
            # print(request.POST.get('osize'))
            # print(request.POST.get('now'))

            content = request.POST.get('osize')
            username = request.user.username
            pic = request.POST.get('pic',"")
            create_time = request.POST.get('now')

            result = {'content': content, 'username': username, 'create_time': create_time}


            user_id = User.objects.get(username=username)
            print(user_id)
            Says.objects.create(user_id=user_id,content=content,pic=pic)
        return render(request,'reviews.html',result)



    def get(self,request):
        result = []
        says = Says.objects.all().order_by('-creat_time')
        print(says)
        for say in says:
            temp_dict = {}
            temp_dict['create_time'] = say.creat_time
            temp_dict['content'] = say.content
            temp_dict['username'] = say.user_id.username
            temp_comments_list = []
            comments = Comments.objects.filter(says_comments_id=say.id).all().order_by('-creat_time')
            if comments:
                for comment in comments:
                    temp_comment_dict = {}
                    temp_comment_dict['content'] = comment.comments
                    temp_comment_dict['create_time'] = comment.creat_time
                    temp_comment_dict['username'] = comment.user_id.username
                    temp_comment_dict['beusername'] = comment.beuser_id.username
                    temp_comments_list.append(temp_comment_dict)
                temp_dict['comments'] = temp_comments_list
            else:
                temp_dict['comments'] = ""
            result.append(temp_dict)
        return render(request, 'reviews.html', {'result': result})
