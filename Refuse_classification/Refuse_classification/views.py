
from django.shortcuts import render
def my404(request):
    import random
    return render(request, "404.html", {"id":random.randint(1, 100)}, status=404)