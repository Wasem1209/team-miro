from django.db import models
from django.conf import settings
from car.models import Car
from django.utils import timezone
import uuid

# Create your models here.

class Reservation(models.Model):
    RESERVATION_CHOICES = (
        ('firm', 'Firm'),
        ('soft', 'Soft',)
    )

    STATUS_CHOICES = (  
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('modified', 'Modified'),
        ('active', 'Active'),
        ('no-show', 'No-Show'),
        ('dispute', 'Dispute'),
        ('cancelled', 'Cancelled'),
        ('overridden', 'Overridden'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, unique=False, blank=True, null=True)
    guest_email = models.EmailField(blank=True, null=True, unique=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, unique=False)
    reservation_type = models.CharField(choices=RESERVATION_CHOICES, max_length=20)
    status = models.CharField(choices=STATUS_CHOICES, max_length=20, default='pending')
    pickup_location = models.TextField()
    dropoff_location = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['id']),
            models.Index(fields=['user']),
            models.Index(fields=['car']),
            models.Index(fields=['reservation_type']),
            models.Index(fields=['status']),
        ]

    @property
    def duration(self):
        if self.start_date and self.end_date:
            delta = self.end_date - self.start_date
            return delta.days + 1 # +1 to include both start and end date

    @property
    def price_per_day(self):
        if self.car:
            return self.car.price_per_day
        
    @property
    def total_price(self):
        return self.duration * self.car.price_per_day
    
    def is_active(self):
        today = timezone.now().today()
        return self.start_date <= today <= self.end_date
