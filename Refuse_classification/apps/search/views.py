from django.shortcuts import render
from apps.search.API import api_baidu
# Create your views here.
from django.http import JsonResponse



def ajax_demo(request):
    result = ""
    if request.is_ajax:
        kw = request.POST.get('kw')
        result = api_baidu.jiekou(kw)
        #print(result)
        # return render(request, 'ceshi.html')
    return JsonResponse({"result":result})