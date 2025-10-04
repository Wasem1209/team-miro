from rest_framework import serializers
from .models import CustomUser, PaymentMethod, DriverLicence

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'firstname', 'lastname', 'password', 'profile_photo', 'address', 'phone_numer', 'gender', 'created_at', 'updated_at']

class PaymentMethodSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = PaymentMethod
        # fields = ['id', 'user', 'name', 'card_number', 'security_code', 'expiring_date', 'created_at', 'updated_at']
        fields = '__all__'
    
class DriverLicenceSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = DriverLicence
        fields = ['id', 'user', 'license_number', 'issuing_authority', 'issue_date', 'expiring_date', 'expiring_date', 'created_at', 'updated_at']

    