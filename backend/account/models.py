from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class CustomUser(AbstractUser):
    CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    gender = models.CharField(choices=CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class PaymentMethod(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=100)
    security_code = models.CharField(max_length=20)
    expiring_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class DriverLicence(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=50)
    issuing_authority = models.CharField(max_length=50)
    issue_date = models.DateField()
    expiring_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)