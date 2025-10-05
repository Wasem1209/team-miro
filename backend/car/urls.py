from django.urls import path
from .views import CarCreateAPIView, CarListAPIView, CarRetrieveAPIView, CarDestroyAPIView

urlpatterns = [
    path('new/', CarCreateAPIView.as_view(), name='create_car'),
    path('', CarListAPIView.as_view(), name='list_cars'),
    path('<int:pk>/', CarRetrieveAPIView.as_view(), name='retrieve_car'),
    path('<int:pk>/delete/', CarDestroyAPIView.as_view(), name='delete_car'),
]