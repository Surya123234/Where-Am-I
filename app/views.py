from re import L
from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Tribe
from .forms import newStoryForm
import math
import wikipedia

# Create your views here.

stories = []
# have a list of dictionaries, the key will be location the value will be the story


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

    # wikipedia stuff
    try:
        summary = wikipedia.summary(name)
        link = wikipedia.page(name).url
    except:
        pass

    return render(
        request,
        "app/view_result.html",
        {"name": name, "summary": summary, "link": link},
    )


def view_stories(request):
    username = request.user.username
    return render(
        request,
        "app/view_stories.html",
        {"stories": stories, "username": username},
    )


@login_required
def create_story(request):
    username = request.user.username

    if request.method == "POST":
        form = newStoryForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data["name"]
            details = form.cleaned_data["details"]
            stories.append({name: details})
            return redirect(reverse("app:view_stories"))

        else:
            return render(
                request, "app/create_story", {"form": form, "username": username}
            )

    return render(
        request, "app/create_story.html", {"form": newStoryForm(), "username": username}
    )
