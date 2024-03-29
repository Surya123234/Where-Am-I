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
    path("tribe_summary/", views.tribe_summary, name="tribe_summary"),
    path("view_stories/", views.view_stories, name="view_stories"),
    path("my_stories/", views.my_stories, name="my_stories"),
    path("create_story/", views.create_story, name="create_story"),
    path("update_story/<str:id>/", views.update_story, name="update_story"),
    path("delete_story/<str:id>/", views.delete_story, name="delete_story"),
]
