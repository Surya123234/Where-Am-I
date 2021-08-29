from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.urls import reverse
from .models import Tribe
import math
import wikipedia

# Create your views here.


def index(request):
    return render(request, "app/index.html", {"tribes": Tribe.objects.all()})


def view_closest_territory(request):
    return render(request, "app/view_closest_territory.html")


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

        # wikipedia stuff
        try:
            summary = wikipedia.summary(name)
            link = wikipedia.page(name).url
        except:
            pass

        # return the TribeName, Long, Lat, Wiki Summary
        return JsonResponse(
            {
                "success": True,
                "name": name,
                "summary": summary,
                "link": link,
                "url": reverse("app:view_result"),
            },
            safe=False,
        )
    return JsonResponse({"success": False})


def view_result(request):
    name = request.GET.get("name", None)
    summary = request.GET.get("summary", None)
    link = request.GET.get("link", None)

    return render(
        request,
        "app/view_result.html",
        {"name": name, "summary": summary, "link": link},
    )
