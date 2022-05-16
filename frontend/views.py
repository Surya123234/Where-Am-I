from django.shortcuts import render

from api.forms import newStoryForm

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


def tribe_summary(request):
    username = request.user.username
    return render(request, "frontend/tribe_summary.html", {"username": username})


def view_stories(request):
    username = request.user.username
    return render(request, "frontend/view_stories.html", {"username": username})


def my_stories(request):
    username = request.user.username
    return render(request, "frontend/my_stories.html", {"username": username})


def create_story(request):
    username = request.user.username
    form = newStoryForm()
    return render(
        request, "frontend/create_story.html", {"username": username, "form": form}
    )


def update_story(request, id):
    username = request.user.username
    return render(
        request, "frontend/update_story.html", {"username": username, "id": id}
    )


def delete_story(request, id):
    username = request.user.username
    return render(
        request, "frontend/delete_story.html", {"username": username, "id": id}
    )
