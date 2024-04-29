from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from signup.models import UserProfile

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    data = json.loads(request.body)
    User = get_user_model()
    user = User.objects.create_user(
        username=data['email'],
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        password=data['password'],
    )

    UserProfile.objects.create(
        user=user,
        saved_workouts=data.get('saved_workouts', '[]'),
        workout_week=data.get('workout_week', '[0,0,0,0,0,0,0]'),
        previous_workouts=data.get('previous_workouts', '[]')
    )

    user.save()

    return JsonResponse({'message': 'User registered successfully'}, status=201)
