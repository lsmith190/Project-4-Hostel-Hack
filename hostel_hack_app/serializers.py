from rest_framework import serializers
from .models import User, Hostel, Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'date', 'time', 'description', 'hostel')

class HostelSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Hostel
        fields = ('id', 'name', 'location', 'arrival_date', 'departure_date', 'user', 'events')

class UserSerializer(serializers.ModelSerializer):
    hostels = HostelSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'hostels')