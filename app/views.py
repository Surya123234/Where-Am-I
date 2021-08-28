from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Tribe

# Create your views here.


def index(request):
    return render(request, "app/index.html", {"tribes": Tribe.objects.all()})
