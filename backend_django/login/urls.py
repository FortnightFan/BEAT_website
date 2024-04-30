from django.urls import path
from .views import login_user, debug_login

urlpatterns = [
    path('login/', login_user, name='login'),
    path('debug_login/', debug_login, name='debug_login')
]
