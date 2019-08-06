from django.shortcuts import render
from apps.search.API import api_baidu
# Create your views here.

def search(request):
    result = ""
    if request.method == 'POST':
        kw = request.POST.get('pkeyword')
        result = api_baidu.jiekou(kw)
        # return render(request, 'ceshi.html')
    return render(request, 'search.html', {'result': result})
