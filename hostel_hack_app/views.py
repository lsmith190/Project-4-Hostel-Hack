from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, HostelSerializer, EventSerializer
from .models import User, Hostel, Event


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class HostelView(viewsets.ModelViewSet):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
