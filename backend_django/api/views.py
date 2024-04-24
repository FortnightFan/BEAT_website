from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer
from django.shortcuts import render
from django.http import JsonResponse
import json

class ExerciseListCreate(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

def filter_exercises(request):
    # data = json.loads(request.body)
    print("hello")
    queryset = Exercise.objects.filter(primaryMuscles='["lats"]')
    data = list(queryset.values())
    return JsonResponse(data, safe=False)