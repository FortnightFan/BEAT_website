from django.urls import path
from . import views

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-view-create"),
]