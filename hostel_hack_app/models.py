from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Hostel(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hostels')

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return self.name


