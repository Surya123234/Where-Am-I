from re import L
from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Story, Tribe
from .forms import newStoryForm
import math
import wikipedia

# Create your views here.


def homepage(request):
    username = request.user.username
    return render(request, "app/Homepage.html", {"username": username})


def explore_tribes(request):
    username = request.user.username
    return render(request, "app/exploreTribes.html", {"username": username})


def view_closest_territory(request):
    username = request.user.username
    return render(request, "app/view_closest_territory.html", {"username": username})


def ajax_filter(request):
    if request.method == "GET":
        latUser = request.GET.get("lat", None)
        latUser = float(latUser)
        lngUser = request.GET.get("long", None)
        lngUser = float(lngUser)
        distance = 1000000
        name = ""

        # database logic
        for tribe in Tribe.objects.all():
            latTribe = float(tribe.latitude)
            lngTribe = float(tribe.longitude)

            # x2,y2 is tribe
            # x1, y1,is User
            tempDistance = math.sqrt(
                (latTribe - latUser) ** 2 + (lngTribe - lngUser) ** 2
            )
            if tempDistance < distance:
                distance = tempDistance
                name = tribe.name

        # return the TribeName
        return JsonResponse(
            {
                "success": True,
                "name": name,
                # "url": reverse("app:view_result"),
            },
            safe=False,
        )
    return JsonResponse({"success": False})


def view_result(request):
    name = request.GET.get("name", None)
    username = request.user.username

    # wikipedia stuff
    try:
        summary = wikipedia.summary(name)
        link = wikipedia.page(name).url
    except:
        pass

    return render(
        request,
        "app/view_result.html",
        {"name": name, "summary": summary, "link": link, "username": username},
    )


def view_stories(request):
    username = request.user.username
    stories = Story.objects.all()
    return render(
        request,
        "app/view_stories.html",
        {"stories": stories, "username": username},
    )


@login_required
def my_stories(request):
    stories = Story.objects.filter(user=request.user)
    return render(
        request,
        "app/my_stories.html",
        {"stories": stories, "username": request.user.username},
    )


@login_required
def create_story(request):
    username = request.user.username

    if request.method == "POST":
        form = newStoryForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]
            Story.objects.create(user=request.user, title=title, content=content)

            return redirect(reverse("app:view_stories"))

        else:
            return render(
                request, "app/create_story", {"form": form, "username": username}
            )

    return render(
        request, "app/create_story.html", {"form": newStoryForm(), "username": username}
    )


@login_required
def update_story(request, id):
    try:
        story = Story.objects.get(id=int(id))
    except Story.DoesNotExist:
        return render(request, "app/tribe_does_not_exist.html")

    username = request.user.username

    if request.method == "POST":
        form = newStoryForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data["content"]
            story.content = content
            story.save()

            return redirect(reverse("app:my_stories"))
        else:
            form.fields["title"].widget.attrs["readonly"] = True
            return render(
                request, "app/update_story", {"form": form, "username": username}
            )

    # GET request
    existing_story_info = {"title": story.title, "content": story.content}
    form = newStoryForm(initial=existing_story_info)
    form.fields["title"].widget.attrs["readonly"] = True
    return render(
        request,
        "app/update_story.html",
        {"form": form, "story_id": story.id, "username": username},
    )


@login_required
def delete_story(request, id):
    try:
        story = Story.objects.get(id=int(id))
    except Story.DoesNotExist:
        return render(
            request,
            "app/tribe_does_not_exist.html",
            {"username": request.user.username},
        )
    story.delete()
    return redirect(reverse("app:my_stories"))
