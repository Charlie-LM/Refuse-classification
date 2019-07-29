from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')

def news(request):
    return render(request,'News.html')

def interest(request):
    return render(request,'interest.html')

def base(request):
    return render(request,'base.html')
