from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tribe(models.Model):
    name = models.CharField(max_length=255)
    longitude = models.DecimalField(max_digits=5, decimal_places=2)
    latitude = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.name} at (latitude {self.latitude}, longitude {self.longitude})"


class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    content = models.TextField()

    def __str__(self):
        return f"'{self.title}' by '{self.user}'"
