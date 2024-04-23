from django.urls import path
from .views import register_user  # Import the register_user view from views.py

urlpatterns = [
    # URL pattern for user registration
    path('register/', register_user, name='register'),  # Map /accounts/register/ to the register_user view
]
