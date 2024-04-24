from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from .models import CustomUser
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

@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Extract sign-in data from the parsed JSON data
        email = data.get('email')
        password = data.get('password')

        # Print the received email and password for debugging
        print("Received email:", email)
        print("Received password:", password)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Check if the user is active
            if user.is_active:
                login(request, user)
                # Return success response
                return JsonResponse({'message': 'Sign in successful'})
            else:
                return JsonResponse({'error': 'Account is not active'}, status=400)
        else:
            # Return error response for invalid credentials
            return JsonResponse({'error': 'Invalid email or password'}, status=400)
    else:
        # Return error response for invalid request method
        return JsonResponse({'error': 'Invalid request method'}, status=400)
