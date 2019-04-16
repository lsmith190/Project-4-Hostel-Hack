from django.contrib import admin
from .models import User, Hostel, Event

admin.site.register([User, Hostel, Event])