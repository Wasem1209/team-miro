from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentMethodViewSet, DriverLicenceViewSet

router = DefaultRouter()
router.register(r'PaymentMethod', PaymentMethodViewSet)
router.register(r'DriverLicence', DriverLicenceViewSet)

urlpatterns = [
    path('', include(router.urls))
]