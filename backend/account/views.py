from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from utils.permissions import IsAdminOrSelf
from .models import CustomUser, PaymentMethod, DriverLicence
from .serializers import CustomUserSerializer, LogoutSerializer, PaymentMethodSerializer, DriverLicenceSerializer
from rest_framework.response import Response
from rest_framework import status
    
'''
Viewsets for user profile
'''
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return CustomUser.objects.all()
        else:    
            return CustomUser.objects.filter(pk=user.pk)


'''
Viewsets for the payment method
'''
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

'''
Viewsets for the drivers licence
'''
class DriverLicenceViewSet(viewsets.ModelViewSet):
    queryset = DriverLicence.objects.all()
    serializer_class = DriverLicenceSerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]