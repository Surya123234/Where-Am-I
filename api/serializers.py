from dataclasses import fields
from rest_framework import serializers
from .models import Story, Tribe, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tribe
        fields = "__all__"


class StorySerializer(serializers.ModelSerializer):
    created_by = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Story
        fields = ("id", "created_by", "title", "content")
