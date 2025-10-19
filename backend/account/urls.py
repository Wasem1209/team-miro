from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, PaymentMethodViewSet, DriverLicenceViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'paymentmethod', PaymentMethodViewSet)
router.register(r'driverlicense', DriverLicenceViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # General Djoser endpoint (registration, password reset, etc.)
    path('auth/', include('djoser.urls')), 
    
    # Djoser's JWT-specific endpoints (login, refresh, verify)
    path('auth/', include('djoser.urls.jwt')),

]