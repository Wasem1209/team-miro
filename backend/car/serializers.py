from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'model', 'year', 'colour', 'car_type', 'price_per_day', 'pickup_location', 'status', 'rules', 'seating_capacity', 'luggage_capacity', 'wheel_drive', 'fuel_type', 'transmission', 'photo', 'plate_number', 'created_at', 'updated_at']