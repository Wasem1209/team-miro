from rest_framework import serializers
from .models import CustomUser, PaymentMethod, DriverLicence

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'firstname', 'address', 'phone_numer', 'gender', 'created_at', 'updated_at']

class PaymentMethodSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = PaymentMethod
        fields = ['user', 'name', 'card_number', 'security_code', 'expiring_date', 'created_at', 'updated_at']

    
class DriverLicenceSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = DriverLicence
        fields = ['user', 'license_number', 'issuing_authority', 'issue_date', 'expiring_date', 'expiring_date', 'created_at', 'updated_at']

    