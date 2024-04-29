from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from signup.models import UserProfile
from signup.forms import SignUpForm  # Make sure to import your form
import logging

logger = logging.getLogger(__name__)
@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {str(e)}")
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    form = SignUpForm(data)
    
    if form.is_valid():
        user = form.save()  # Save the user and get the instance back

        UserProfile.objects.create(
            user=user,
            saved_workouts=data.get('saved_workouts', '[]'),
            workout_week=data.get('workout_week', '[0,0,0,0,0,0,0]'),
            previous_workouts=data.get('previous_workouts', '[]')
        )

        return JsonResponse({'message': 'User registered successfully'}, status=201)

    else:
        # If the form is not valid, return an error response
        errors = form.errors.as_json()
        return JsonResponse({'errors': errors}, status=400)