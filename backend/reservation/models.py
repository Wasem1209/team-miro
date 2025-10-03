from django.db import models
from django.conf import settings
from car.models import Car

# Create your models here.

class Reservation(models.Model):
    RESERVATION_CHOICES = (
        ('firm', 'Firm'),
        ('soft', 'Soft',)
    )

    STATUS_CHOICES = (  
        ('pennding', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('modified', 'Modified'),
        ('active', 'Active'),
        ('no-show', 'No-Show'),
        ('dispute', 'Dispute'),
        ('cancelled', 'Cancelled'),
    )

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    guest_email = models.EmailField(blank=True, null=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    reservation_type = models.CharField(choices=RESERVATION_CHOICES)
    status = models.CharField(choices=STATUS_CHOICES)
    pickup_location = models.TextField()
    dropoff_location = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
