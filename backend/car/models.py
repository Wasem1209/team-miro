from django.db import models
import uuid

# Create your models here.

class Car(models.Model):
    CARTYPE_CHOICES = (
        ('suv', 'suv'),
        ('sedan', 'Sedan'),
        ('bus', 'Bus'),
        ('van', 'Van'),
        ('luxury-car', 'Luxury-Car'),
    )

    STATUS_CHOICES = (
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('unavailable', 'Unavailable'),
    )


    WHEELDRIVE_CHOICES = (
        ('2-wheel', '2-wheel'),
        ('4-wheel', '4-wheel'),
    )

    FUELTYPE_CHOICES = (
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
    )

    TRANSMISSION_CHOICES = (
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.CharField(max_length=10)
    colour = models.CharField(max_length=100)
    car_type = models.CharField(choices=CARTYPE_CHOICES, max_length=20)
    price_per_day = models.FloatField()
    pickup_location = models.TextField()
    status = models.CharField(choices=STATUS_CHOICES, max_length=20)
    rules = models.TextField()
    seating_capacity = models.IntegerField()
    luggage_capacity = models.IntegerField()
    plate_number = models.CharField(max_length=100, unique=True)
    wheel_drive = models.CharField(choices=WHEELDRIVE_CHOICES, max_length=20)
    fuel_type = models.CharField(choices=FUELTYPE_CHOICES, max_length=20)
    transmission = models.CharField(choices=TRANSMISSION_CHOICES, max_length=20)
    photo = models.ImageField(upload_to='car_photos', blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['model']),
            models.Index(fields=['year']),
            models.Index(fields=['colour']),
            models.Index(fields=['car_type']),
        ]
