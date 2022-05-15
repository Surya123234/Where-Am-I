from dataclasses import fields
from rest_framework import serializers
from .models import Story, Tribe


class TribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tribe
        fields = "__all__"


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ("id", "title", "content")
