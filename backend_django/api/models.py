from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100000, default="")
    force = models.CharField(max_length=100000, default="")
    level =models.CharField(max_length=100000, default="")
    mechanic =models.CharField(max_length=100000, default="")
    equipment = models.CharField(max_length=100000, default="")
    primaryMuscles = models.CharField(max_length=100000, default="")
    secondaryMuscles = models.CharField(max_length=100000, default="")
    instructions = models.TextField()
    category = models.CharField(max_length=100000, default="")
    images = models.CharField(max_length=100000, default="")
    id = models.CharField(max_length=100000, default="", primary_key=True)


    def __str__(self):
        return self.name
