from django.urls import path
from . import views

app_name = "frontend"

urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("explore_tribes/", views.explore_tribes, name="explore_tribes"),
    path(
        "view_closest_territory/",
        views.view_closest_territory,
        name="view_closest_territory",
    ),
]
