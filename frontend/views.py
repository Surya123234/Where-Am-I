from django.shortcuts import render

# Create your views here.


def homepage(request):
    username = request.user.username
    return render(request, "frontend/Homepage.html", {"username": username})


def explore_tribes(request):
    username = request.user.username
    return render(request, "frontend/explore_tribes.html", {"username": username})


def view_closest_territory(request):
    username = request.user.username
    return render(
        request, "frontend/view_closest_territory.html", {"username": username}
    )
