from django.urls import path
from . import views
from .views import filter_exercises

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-view-create"),
    path('filter/', filter_exercises, name='filter'), 
]