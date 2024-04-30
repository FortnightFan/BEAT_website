from django.urls import path
from . import views
from .views import filter_exercises, current_user, login_endpoint_test, get_workouts_week, get_saved_workouts, add_workout, remove_workout, save_workout_data, grab_workout_data, save_previous_workout, grab_workout_name, grab_previous_workouts

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-view-create"),
    path('filter/', filter_exercises, name='filter'), 
    path('current_user/', current_user, name='current_user'),
    path('login_test/', login_endpoint_test, name='login_endpoint_test'),
    path('workout_week/', get_workouts_week, name='workout_week'),
    path('saved_workouts/', get_saved_workouts, name='saved_workouts'),
    path('add_workout/', add_workout, name='add_workout'),
    path('remove_workout/', remove_workout, name='remove_workout'),
    path('save_workout_data/', save_workout_data, name='save_workout_data'),
    path('grab_workout_data/', grab_workout_data, name='grab_workout_data'),
    path('save_previous_workout/', save_previous_workout, name='save_previous_workout'),
    path('grab_workout_name/', grab_workout_name, name='grab_workout_name'),
    path('grab_previous_workouts/', grab_previous_workouts, name='grab_previous_workouts'),



]