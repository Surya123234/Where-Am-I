from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Story, Tribe
from .forms import newStoryForm
import math
import wikipedia
from slugify import slugify

# Create your views here.


def homepage(request):
    username = request.user.username
    return render(request, "app/Homepage.html", {"username": username})


def explore_tribes(request):
    username = request.user.username
    return render(request, "app/explore_tribes.html", {"username": username})


def view_closest_territory(request):
    username = request.user.username
    return render(request, "app/view_closest_territory.html", {"username": username})


def find_closest_territory(request):
    if request.method == "GET":
        try:
            user_lat = float(request.GET.get("lat", None))
            user_long = float(request.GET.get("long", None))
            distance = float("inf")

            # find the tribe closest to the user using the tribe's centralized location coordinate (in order to speed up calculations and still maintain a high accuracy rate)
            for tribe in Tribe.objects.all():
                tribe_lat = float(tribe.latitude)
                tribe_long = float(tribe.longitude)

                # distance equation
                temp_distance = math.sqrt(
                    (tribe_lat - user_lat) ** 2 + (tribe_long - user_long) ** 2
                )

                if temp_distance < distance:
                    distance = temp_distance
                    name = tribe.name
        except Exception as error:
            return JsonResponse({"success": False, "error": error})

        # return the TribeName in JSON format
        # user will be redirected in the front end
        return JsonResponse(
            {
                "success": True,
                "name": name,
            },
            safe=False,
        )
    return JsonResponse({"success": False})


def tribe_summary(request):
    username = request.user.username
    req_params = request.GET

    full_name = req_params.get("full_name")

    # full name slugified in case this param came from view_closest_territory
    new_slug_full_name = slugify(full_name)

    # sometimes the slugified version is shorter than the full name
    slug_name = req_params.get("slug_name")

    # wikipedia stuff
    # get_wiki_info is a helper method (defined at the end of this file)
    # A formatted string needs to be used to avoid existing Wikipedia API bugs
    try:
        wiki_info = get_wiki_info(f"{slug_name}")
        print("slug name used")
    except wikipedia.exceptions.DisambiguationError:
        print("full name used")
        wiki_info = get_wiki_info(f"{new_slug_full_name}")

    return render(
        request,
        "app/tribe_summary.html",
        {
            "name": full_name,
            "summary": wiki_info["summary"],
            "link": wiki_info["link"],
            "username": username,
        },
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
                request, "app/create_story.html", {"form": form, "username": username}
            )

    return render(
        request, "app/create_story.html", {"form": newStoryForm(), "username": username}
    )


@login_required
def update_story(request, id):
    user = request.user
    username = user.username

    try:
        story = Story.objects.get(id=int(id))
    except Story.DoesNotExist:
        return render(
            request,
            "app/story_does_not_exist.html",
            {"username": username},
        )

    if user != story.user:
        return render(
            request,
            "app/permission_error.html",
            {"action": "edit", "username": username},
        )

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
                request, "app/update_story.html", {"form": form, "username": username}
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
    user = request.user
    username = user.username

    try:
        story = Story.objects.get(id=int(id))
    except Story.DoesNotExist:
        return render(
            request,
            "app/story_does_not_exist.html",
            {"username": username},
        )

    if user != story.user:
        return render(
            request,
            "app/permission_error.html",
            {"action": "delete", "username": username},
        )

    story.delete()
    return redirect(reverse("app:my_stories"))


### HELPER METHODS ###


def get_wiki_info(name):
    title = wikipedia.search(name)[0]
    page = wikipedia.page(title, auto_suggest=False)
    summary = page.summary
    link = page.url
    return {"summary": summary, "link": link}
