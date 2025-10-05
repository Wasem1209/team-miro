from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from .models import CustomUser, PaymentMethod, DriverLicence

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


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    
    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except Exception:
            self.fail('bad_token')

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

    