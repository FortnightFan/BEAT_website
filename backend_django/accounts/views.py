from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the backend!")


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        # Extract registration data from the request
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        password = request.POST.get('password')
        
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
