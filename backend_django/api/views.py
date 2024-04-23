from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer

class ExerciseListCreate(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

