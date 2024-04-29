from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model

class CustomUser(AbstractUser):
    # If you need additional fields, you can add them here
    pass

class UserProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    saved_workouts = models.TextField(default='[]')
    workout_week = models.TextField(default='[0,0,0,0,0,0,0]')
    previous_workouts = models.TextField(default='[]')