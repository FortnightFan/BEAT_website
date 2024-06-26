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
from django.contrib.auth import get_user_model
SECRET_KEY = 'django-insecure-jf-!a4zinxk^o0qixeh*=ei727pczbjc+35tz%8)3360dxeslu'

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
    if primaryMuscles != ['']:
        primaryMuscles = f'["{primaryMuscles[0]}"]'
        filtered_queryset = filtered_queryset.filter(primaryMuscles=primaryMuscles)
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
    
@csrf_exempt
def get_workouts_week(request):
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])

    return JsonResponse({'message': user.userprofile.workout_week})

@csrf_exempt
def get_saved_workouts(request):
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])

    return JsonResponse({'message': user.userprofile.saved_workouts})

from django.shortcuts import get_object_or_404
from signup.models import UserProfile
@csrf_exempt
def add_workout(request):
    data = json.loads(request.body)
    data['exercise_list'] = []

    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)

    workout_list = json.loads(user_profile.saved_workouts)
    workout_list.append(data)
    user_profile.saved_workouts = json.dumps(workout_list)
    user_profile.save()
    return JsonResponse({'message': user_profile.saved_workouts})

@csrf_exempt
def remove_workout(request):
    data = json.loads(request.body)
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)

    workout_list = json.loads(user_profile.saved_workouts)
    id = data["ID"]
    for workout in workout_list:
        if workout['ID'] == id:
            workout_list.remove(workout)
            break
    
    #Correct id numbers
    id = 0
    for workout in workout_list:
        workout["ID"] = id
        id += 1

    user_profile.saved_workouts = json.dumps(workout_list)
    user_profile.save()
    return JsonResponse({'message': "successful"})

@csrf_exempt
def save_workout_data(request):
    data = json.loads(request.body)
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)

    id = int(data['ID'])
    saved_workouts = json.loads(user_profile.saved_workouts)
    
    for workouts in saved_workouts:
        if workouts['ID'] == id:
            workouts["exercise_list"] = data['exercises']
    
    user_profile.saved_workouts = json.dumps(saved_workouts)
    for workouts in saved_workouts:
        print(workouts)
    user_profile.save()
    
    return JsonResponse({'message': "successful"})

@csrf_exempt
def grab_workout_data(request):
    data = json.loads(request.body)
    id = int(data['ID'])
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)
    saved_workouts = json.loads(user_profile.saved_workouts)

    workout_list = []

    for workouts in saved_workouts:
        if workouts['ID'] == id:
            workout_list = workouts['exercise_list']
            break

    return JsonResponse(workout_list, safe=False)

@csrf_exempt
def grab_workout_name(request):
    data = json.loads(request.body)
    id = int(data['ID'])
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)
    workout_name = ''
    saved_workouts = json.loads(user_profile.saved_workouts)

    for workouts in saved_workouts:
        if workouts['ID'] == id:
            workout_name = workouts['Name']
            break

    return JsonResponse({ 'Name' : workout_name})

import ast
@csrf_exempt
def save_previous_workout(request):
    data = json.loads(request.body)
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)
    print(ast.literal_eval(user_profile.previous_workouts))
    user_profile.previous_workouts =  ast.literal_eval(user_profile.previous_workouts)
    user_profile.previous_workouts.append(data)

    user_profile.workout_week = json.loads(user_profile.workout_week)
    user_profile.workout_week[6] += 1
    user_profile.save()
    return JsonResponse({'message': "successful"})

@csrf_exempt
def grab_previous_workouts(request):
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.split('Bearer ')[-1]
    user_info = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = get_user_model().objects.get(email=user_info['email'])
    user_profile = get_object_or_404(UserProfile, user_id=user)
    user_profile.previous_workouts =  ast.literal_eval(user_profile.previous_workouts)

    # user_profile.previous_workouts = json.loads(user_profile.previous_workouts)
    # return JsonResponse(user_profile.previous_workouts)
    return JsonResponse({'message': str(user_profile.previous_workouts)})

