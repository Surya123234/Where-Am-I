from django.contrib import admin
from .models import Tribe

# Register your models here.
admin.site.register(Tribe)


class tribeAdmin(admin.ModelAdmin):
    list_display = ["name", "longitude", "latitude"]
