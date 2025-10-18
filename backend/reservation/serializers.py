from rest_framework import serializers
from .models import Reservation
from datetime import date


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request', None)
        if request:
            if not request.user.is_staff:
                fields['reservation_type'].read_only = True
                fields['status'].read_only = True

            if request.user.is_authenticated:
                # Hide guest_email for authenticated users
                fields.pop('guest_email', None)
                fields['user'].required = False  # Will be set automatically
            else:
                # Hide user for guest users
                fields.pop('user', None)
                fields['guest_email'].required = True
        return fields

    def validate(self, data):
        request = self.context.get('request', None)
        if request:
            if request.user.is_authenticated and 'guest_email' in self.initial_data:
                raise serializers.ValidationError({
                    'guest_email error': 'Authenticated users cannot set guest_email.'
                })
            if not request.user.is_authenticated and 'user' in self.initial_data:
                raise serializers.ValidationError({
                    'user error': 'Guest users cannot set user.'
                })

            if data['start_date'] < date.today() and data['end_date'] < date.today():
                raise serializers.ValidationError({
                    'date error': 'The start date and end date must be a current or future date'
                })
            if data['start_date'] > data['end_date']:
                raise serializers.ValidationError({
                    'date error': 'The end date cannot be before the start date'
                })
        return data

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)