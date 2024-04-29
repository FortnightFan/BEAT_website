from django.urls import path
from . import views
from .views import filter_exercises, current_user, login_endpoint_test, get_workouts_week

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-view-create"),
    path('filter/', filter_exercises, name='filter'), 
    path('current_user/', current_user, name='current_user'),
    path('login_test/', login_endpoint_test, name='login_endpoint_test'),
    path('workout_week/', get_workouts_week, name='workout_week'),
    path('saved_workouts/', get_workouts_week, name='saved_workouts')

    
]