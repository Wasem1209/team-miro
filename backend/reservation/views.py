from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import filters
from .serializers import ReservationSerializer
from .models import Reservation
from utils.permissions import IsAdminOrSelf

# to create a reservation
class ReservationCreateAPIView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        user = self.request.user
        car = self.request.data.get('car')
        start_date = self.request.data.get('start_date')
        end_date = self.request.data.get('end_date')

        if user.is_authenticated:
            # Check for overlapping guest reservation
            overlaps = Reservation.objects.filter(
                car_id=car,
                reservation_type='soft',
                status='pending',
                start_date__lt=end_date,
                end_date__gt=start_date
            )
            for guest_res in overlaps:
                guest_res.status = 'overridden'
                guest_res.save()
            serializer.save(user=user, reservation_type='firm', status='pending')
        else:
            serializer.save(reservation_type='soft', status='pending')

# to update a reservation
class ReservationUpdateAPIView(generics.UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminOrSelf]

    def perform_update(self, serializer):
        user = self.request.user
        instance = self.get_object()
        if not user.is_staff and instance.user == user:
            serializer.save(status='modified')
        else:
            serializer.save()

# to get a particular reservation
class ReservationRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminOrSelf]

# to get the list of all reservations
class ReservationListAPIView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminOrSelf]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['id', 'user', 'car', 'status']
    ordering_fields = ['created_at']

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return Reservation.objects.all()
        else:
            return Reservation.objects.filter(user=user)

# to cancel a reservation
class ReservationCancelAPIView(APIView):
    permission_classes = [IsAdminOrSelf]

    def post(self, request, pk):
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response({'detail': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check permission
        self.check_object_permissions(request, reservation)

        reservation.status = 'cancelled'
        reservation.save()
        return Response({'detail': 'Reservation cancelled.'}, status=status.HTTP_200_OK)

# to confirm a reservation
class ReservationConfirmAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, pk):
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response({'detail': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check permission
        self.check_object_permissions(request, reservation)

        reservation.status = 'confirmed'
        reservation.save()
        return Response({'detail': 'Reservation confirmed.'}, status=status.HTTP_200_OK)
