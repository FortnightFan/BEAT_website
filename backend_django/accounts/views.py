from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser

from django.http import HttpResponse
import json
def home(request):
    return HttpResponse("Welcome to the backend!")


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Extract registration data from the parsed JSON data
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        
        # Check if user with the provided email already exists
        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'error': 'User with this email already exists'}, status=400)

        # Create a new user object
        user = CustomUser.objects.create_user(email=email, first_name=first_name, last_name=last_name, password=password)
        
        # Return success response
        return JsonResponse({'message': 'User registered successfully'})
    else:
        # Return error response for invalid request method
        return JsonResponse({'error': 'Invalid request method'}, status=400)
