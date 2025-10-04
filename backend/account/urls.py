from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LogoutView, PaymentMethodViewSet, DriverLicenceViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'PaymentMethod', PaymentMethodViewSet)
router.register(r'DriverLicence', DriverLicenceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # registration endpoint
    path('register/', RegisterView.as_view(), name='register'),
    # Login endpoint
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Logout endpoint
    path('logout/', LogoutView.as_view(), name='register'),

]