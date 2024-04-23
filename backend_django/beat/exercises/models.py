from django.db import models

# Create your models here.
class Exercises(models.Model):
  id = models.IntegerField(primary_key=True)
  exercise = models.CharField(max_length=100)
  description = models.CharField(max_length=1000)