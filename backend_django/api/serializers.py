from rest_framework import serializers
from .models import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "force", "level", "mechanic", "equipment", "primaryMuscles", "secondaryMuscles", "instructions", "category", "images"]
