from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer
from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import sqlite3
from django.db.models import Q
from django.views.decorators.http import require_http_methods
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

# @login_required
def current_user(request):
    user = request.user
    print(request.user.is_authenticated)
    
        # print(user.first_name)
    return JsonResponse({'name': "user.first_name"})

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import jwt

@csrf_exempt
@login_required
def login_endpoint_test(request):
    if request.method == 'GET':
        # Retrieve the authenticated user
        user = request.user

        # Respond with some protected data (for demonstration purposes)
        return JsonResponse({'message': f'Hello, {user.username}! This is a protected endpoint.'})
    else:
        # Respond with a method not allowed error for non-GET requests
        return JsonResponse({'error': 'Method not allowed'}, status=405)