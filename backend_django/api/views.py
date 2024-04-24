from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer
from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import sqlite3
from django.db.models import Q

class ExerciseListCreate(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

@csrf_exempt
def filter_exercises(request):
    filtered_queryset = Exercise.objects.all()

    data = json.loads(request.body)
    print(data)
    level = data['level']
    equipment = data['equipment']
    primaryMuscles = data['primaryMuscles']

    if level != '':
        filtered_queryset = filtered_queryset.filter(level=level)
    if equipment != '':
        filtered_queryset = filtered_queryset.filter(equipment=equipment)
    if primaryMuscles != '':
        primaryMuscles = f'["{primaryMuscles[0]}"]'
        filtered_queryset = filtered_queryset.filter(primaryMuscles=primaryMuscles)
    print(filtered_queryset)

    return JsonResponse({'results': list(filtered_queryset.values())})