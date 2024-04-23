from django.urls import path
from . import views

urlpatterns = [
  path('exercises/', views.exercises, name = 'exercises'),
]
