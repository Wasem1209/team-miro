from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation

NOTIFY_STATUSES = {"confirmed", "modified", "cancelled", "overridden"}

STATUS_EMAILS = {
    'confirmed': {
        'subject': lambda car: f'Your reservation for {car.name} has been confirmed',
        'message': lambda car, reservation: (
            f"Congratulations! Your reservation for {car.name} {car.model} {car.year} has been confirmed.\n \n"
            f"Reservation Details:\n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Status: {reservation.status}\n \n"
            "Thank you for choosing EasyDrive!"
        )
    },
    'modified': {
        'subject': lambda car: f'Your reservation for {car.name} has been modified',
        'message': lambda car, reservation: (
            f"Your reservation for {car.name} {car.model} {car.year} has been modified.\n \n"
            f"Reservation Details:\n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Status: {reservation.status}\n \n"
            "Thank you for choosing EasyDrive!"
        )
    },
    'cancelled': {
        'subject': lambda car: f'Your reservation for {car.name} has been cancelled',
        'message': lambda car, reservation: (
            f"Your reservation for {car.name} {car.model} {car.year} has been cancelled.\n \n"
            f"Reservation Details:\n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Status: {reservation.status}\n \n"
            "Visit our site now to make another reservation \n"
            "Thank you for choosing EasyDrive!"
        )
    },
    'overridden': {
        'subject': lambda car: f'Your reservation for {car.name} has been overridden',
        'message': lambda car, reservation: (
            f"Your soft reservation for {car.name} {car.model} {car.year} has been overridden by a registered user. The car is no longer reserved for you.\n \n"
            f"Reservation Details:\n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Status: {reservation.status}\n \n"
            "Create an account now to ensure a firm reservation when next you reserve a car \n"
            "Thank you for choosing EasyDrive!"
        )
    },
}


@receiver(pre_save, sender=Reservation)
def send_reservation_status_email(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return
    if old.status != instance.status and instance.status in NOTIFY_STATUSES:
        recipient = instance.user.email if instance.user else instance.guest_email
        car = instance.car
        if recipient and car and instance.status in STATUS_EMAILS:
            subject = STATUS_EMAILS[instance.status]['subject'](car)
            message = STATUS_EMAILS[instance.status]['message'](car, instance)
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=True,
            )

