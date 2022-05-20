from ipaddress import summarize_address_range
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


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
    name = request.GET.get("name")
    summary = request.GET.get("summary")
    link = request.GET.get("link")
    image = request.GET.get("image")
    print("RIGHT BEFORE RETURN RENDER")

    return render(
        request,
        "frontend/tribe_summary.html",
        {
            "username": username,
            "name": name,
            "summary": summary,
            "link": link,
            "image": image,
        },
    )


def view_stories(request):
    username = request.user.username
    return render(request, "frontend/view_stories.html", {"username": username})


@login_required
def my_stories(request):
    username = request.user.username
    return render(request, "frontend/my_stories.html", {"username": username})


@login_required
def create_story(request):
    username = request.user.username
    form = newStoryForm()
    return render(
        request, "frontend/create_story.html", {"username": username, "form": form}
    )


@login_required
def update_story(request, id):
    username = request.user.username
    return render(
        request, "frontend/update_story.html", {"username": username, "id": id}
    )


@login_required
def delete_story(request, id):
    username = request.user.username
    return render(
        request, "frontend/delete_story.html", {"username": username, "id": id}
    )
