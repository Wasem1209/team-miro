from django.urls import path
from .views import CarCreateAPIView, CarListAPIView, CarRetrieveAPIView, CarUpdateAPIView, CarDestroyAPIView

urlpatterns = [
    path('new/', CarCreateAPIView.as_view(), name='create_car'),
    path('', CarListAPIView.as_view(), name='list_cars'),
    path('<str:pk>/update/', CarUpdateAPIView.as_view(), name='update_car'),
    path('<str:pk>/', CarRetrieveAPIView.as_view(), name='retrieve_car'),
    path('<str:pk>/delete/', CarDestroyAPIView.as_view(), name='delete_car'),
]