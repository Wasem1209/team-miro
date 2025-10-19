from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import uuid

# Create your models here.

class CustomUser(AbstractUser):
    CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    email = models.EmailField(unique=True, blank=False, null=False)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    gender = models.CharField(choices=CHOICES, max_length=20)
    profile_photo = models.ImageField(upload_to='profile_photos', blank=True, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, null=False)
    name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=100, unique=True, blank=False, null=False)
    security_code = models.CharField(max_length=20, blank=False, null=False)
    expiring_date = models.DateField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['name']),
            models.Index(fields=['card_number']),
        ]

class DriverLicence(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    name = models.CharField(max_length=100, blank=False, null=False)
    license_number = models.CharField(max_length=50, unique=True, blank=False, null=False)
    issuing_authority = models.CharField(max_length=50, blank=False, null=False)
    issue_date = models.DateField(blank=False, null=False)
    expiring_date = models.DateField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['name']),
            models.Index(fields=['license_number']),
        ]