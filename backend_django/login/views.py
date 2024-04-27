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
        user = authenticate(request, username=data['username'], password=data['password'])
        if user is not None:
            if user.is_active:
                login(request, user)
                token = generate_token(user) 
                return JsonResponse({'token': token})
            else:
                logger.debug("Account is inactive.")
                return JsonResponse({'message': 'Account is not active'}, status=401) 
        else:
            logger.debug("Invalid credentials provided.")
            return JsonResponse({'message': 'Invalid email or password. Please try again.'}, status=401)
    else:
        logger.debug("Invalid request method.")
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    


@csrf_exempt
def debug_login(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        email = data.get('username')
        password = data.get('password')

        #Temporary, compare against database later, idk how postgresql works atm
        if email == 'kevin@gmail.com' and password == 'password':
            token = generate_token(email) 
            return JsonResponse({'token': token})

    return JsonResponse({'error': 'Invalid credentials'}, status=400)



from datetime import datetime, timedelta
import jwt
SECRET_KEY = 'django-insecure-jf-!a4zinxk^o0qixeh*=ei727pczbjc+35tz%8)3360dxeslu'

def generate_token(user):
    #This info is what is sent to the user when logged in.
    payload = {
        'first_name': user.first_name,
        'last name' : user.last_name,
        'email' : user.email,
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time (1 day from now)
    }

    # Generate JWT token
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token