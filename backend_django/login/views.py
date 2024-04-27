from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(request, username=data['email'], password=data['password'])
    
        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                logger.debug("Account is inactive.")
                return JsonResponse({'message': 'Account is not active'}, status=401) 
        else:
            logger.debug("Invalid credentials provided.")
            return JsonResponse({'message': 'Invalid email or password. Please try again.'}, status=401)
    else:
        logger.debug("Invalid request method.")
        return JsonResponse({'message': 'Invalid request method'}, status=405)
