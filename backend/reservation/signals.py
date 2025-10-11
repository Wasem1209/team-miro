from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation

NOTIFY_STATUSES = {"confirmed", "modified", "cancelled"}

STATUS_EMAILS = {
    'confirmed': {
        'subject': lambda car: f'Your reservation for {car.name} has been confirmed',
        'message': lambda car: f'Congratulations! Your reservation for {car.name} has been confirmed.'
    },
    'modified': {
        'subject': lambda car: f'Your reservation for {car.name} has been modified',
        'message': lambda car: f'Your reservation for {car.name} has been modified. Please review the changes.'
    },
    'cancelled': {
        'subject': lambda car: f'Your reservation for {car.name} has been cancelled',
        'message': lambda car: f'We regret to inform you that your reservation for {car.name} has been cancelled.'
    },
}


@receiver(pre_save, sender=Reservation)
def send_reservation_status_email(sender, instance, **kwargs):
    if not instance.pk:
        return  # New object, not an update
    try:
        old = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return
    if old.status != instance.status and instance.status in NOTIFY_STATUSES:
        recipient = instance.user.email if instance.user else instance.guest_email
        car = instance.car
        if recipient and car and instance.status in STATUS_EMAILS:
            subject = STATUS_EMAILS[instance.status]['subject'](car)
            message = STATUS_EMAILS[instance.status]['message'](car)
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=True,
            )

def notify_guest_reservation_overridden(guest_email, car):
    if guest_email and car:
        send_mail(
            subject=f'Your guest reservation for {car.name} has been overridden',
            message=f'Your guest reservation for {car.name} has been overridden by a registered user. The car is no longer reserved for you.',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[guest_email],
            fail_silently=True,
        )
