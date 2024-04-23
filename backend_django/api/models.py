from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=500, default="")
    force = models.CharField(max_length=500, default="")
    level =models.CharField(max_length=500, default="")
    mechanic =models.CharField(max_length=500, default="")
    equipment = models.CharField(max_length=500, default="")
    primaryMuscles = models.CharField(max_length=500, default="")
    secondaryMuscles = models.CharField(max_length=500, default="")
    instructions = models.CharField(max_length=500, default="")
    category = models.CharField(max_length=500, default="")
    images = models.CharField(max_length=500, default="")
    id = models.CharField(max_length=500, default="", primary_key=True)


    def __str__(self):
        return self.name
