from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import CustomUser, PaymentMethod, DriverLicence
from .serializers import CustomUserSerializer, PaymentMethodSerializer, DriverLicenceSerializer

'''
Authentication View
'''
class RegisterView(generics.CreateAPIView):
    viewsets = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

'''
Viewsets for the payment method
'''
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

'''
Viewsets for the drivers licence
'''
class DriverLicenceViewSet(viewsets.ModelViewSet):
    queryset = DriverLicence.objects.all()
    serializer_class = DriverLicenceSerializer