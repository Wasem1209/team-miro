from django.urls import path
from .views import ReservationCreateAPIView, ReservationListAPIView, ReservationRetrieveAPIView, ReservationUpdateAPIView, ReservationConfirmAPIView, ReservationCancelAPIView

urlpatterns = [
    path('new/', ReservationCreateAPIView.as_view(), name='create-reservation'),
    path('', ReservationListAPIView.as_view(), name='list-reservations'),
    path('<str:pk>/', ReservationRetrieveAPIView.as_view(), name='retrieve-reservation'),
    path('<str:pk>/update/', ReservationUpdateAPIView.as_view(), name='create-reservation'),
    path('<str:pk>/confirm/', ReservationConfirmAPIView.as_view(), name='create-reservation'),
    path('<str:pk>/cancel/', ReservationCancelAPIView.as_view(), name='create-reservation'),
]