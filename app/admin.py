from django.contrib import admin
from .models import Tribe, Story

# Register your models here.
admin.site.register(Tribe)
admin.site.register(Story)


class tribeAdmin(admin.ModelAdmin):
    list_display = ["name", "longitude", "latitude"]


class storyAdmin(admin.ModelAdmin):
    list_display = ["title", "content", "user"]
