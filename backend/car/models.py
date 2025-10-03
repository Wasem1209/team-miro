from django.db import models

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


    name = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.DateField()
    colour = models.CharField(max_length=100)
    car_type = models.CharField(choices=CARTYPE_CHOICES)
    price_per_day = models.FloatField()
    pickup_location = models.TextField()
    status = models.CharField(choices=STATUS_CHOICES)
    rules = models.TextField()
    seating_capacity = models.IntegerField()
    luggage_capacity = models.IntegerField()
    wheel_drive = models.CharField(choices=WHEELDRIVE_CHOICES)
    fuel_type = models.CharField(choices=FUELTYPE_CHOICES)
    transmission = models.CharField(choices=TRANSMISSION_CHOICES)
    photo = models.ImageField(upload_to='media/car_photos/', blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
