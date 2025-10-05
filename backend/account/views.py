from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from utils.permissions import IsAdminOrSelf
from .models import CustomUser, PaymentMethod, DriverLicence
from .serializers import CustomUserSerializer, LogoutSerializer, PaymentMethodSerializer, DriverLicenceSerializer
from rest_framework.response import Response
from rest_framework import status

'''
Authentication View
'''
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        token_data = serializer.get_token(user)
        self.headers['Authorization'] = f'Bearer {token_data["access"]}'
    
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,) 

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    
'''
CRUD operation for user profile
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

'''
Viewsets for the drivers licence
'''
class DriverLicenceViewSet(viewsets.ModelViewSet):
    queryset = DriverLicence.objects.all()
    serializer_class = DriverLicenceSerializer