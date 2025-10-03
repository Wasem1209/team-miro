from rest_framework import serializers
from .models import Reservation
from account.serializers import CustomUserSerializer
from car.serializers import CarSerializer

class ReservationSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    car = CarSerializer(read_only=True, many=True)

    class Meta:
        model = Reservation
        fields = '__all__'