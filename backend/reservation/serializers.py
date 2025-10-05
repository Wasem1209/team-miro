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

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request', None)
        if request and not request.user.is_staff:
            fields['reservation_type'].read_only = True
            fields['status'].read_only = True
        return fields