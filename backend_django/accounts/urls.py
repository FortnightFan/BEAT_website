from django.urls import path
from .views import home, register_user, sign_in

urlpatterns = [
    path('', home, name='home'),
    path('register/', register_user, name='register'),
    path('sign-in/', sign_in, name='sign_in'),  # Add this line for the sign-in view
]
