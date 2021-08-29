from django.urls import path
from . import views

app_name = "app"

urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("explore_tribes/", views.explore_tribes, name="explore_tribes"),
    path(
        "view_closest_territory/",
        views.view_closest_territory,
        name="view_closest_territory",
    ),
    path("ajax_filter/", views.ajax_filter, name="ajax_filter"),
    path("view_result/", views.view_result, name="view_result"),
    path("view_stories/", views.view_stories, name="view_stories"),
    path("create_story", views.create_story, name="create_story"),
]
