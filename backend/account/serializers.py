from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from .models import CustomUser, PaymentMethod, DriverLicence
from datetime import date

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'token', 'password', 'profile_photo', 'address', 'phone_number', 'gender', 'created_at', 'updated_at']

    def create(self, validated_data):
        try:
            user = CustomUser.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
        except Exception as e:
            raise ValidationError(f"failed to create user: {e}")
    
    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class PaymentMethodSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = PaymentMethod
        fields = ['id', 'user', 'name', 'card_number', 'security_code', 'expiring_date', 'created_at', 'updated_at']
        read_only_fields = ['user']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)
    
    def validate(self, data):
        request = self.context.get('request', None)
        if request:            
            if data['expiring_date'] <= date.today():
                raise serializers.ValidationError({
                    'Expired Card': 'Your card is expired'
                })
        return data

class DriverLicenceSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = DriverLicence
        fields = ['id', 'user', 'license_number', 'issuing_authority', 'issue_date', 'expiring_date', 'created_at', 'updated_at']
        read_only_fields = ['user']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)



    def validate(self, data):
        request = self.context.get('request', None)
        if request:            
            if data['expiring_date'] <= date.today():
                raise serializers.ValidationError({
                    'Expired Driver\'s License': 'Your driver\'s license is expired'
                })
            if data['issue_date'] > date.today():
                raise serializers.ValidationError({
                    'Invalid Issue Date': 'The issue date cannot be a future date'
                })
            if data['issue_date'] >= data['expiring_date']:
                raise serializers.ValidationError({
                    'date error': 'The expiring date cannot be before the issue date'
                })
        return data
