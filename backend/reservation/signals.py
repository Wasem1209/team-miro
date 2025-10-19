from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation
from account.models import CustomUser

NOTIFY_STATUSES = {"pending", "confirmed", "modified", "cancelled", "overridden"}

'''
Email status for registered Users
'''
REGISTERED_STATUS_EMAILS = {
    'confirmed': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been confirmed',
        'message': lambda car, reservation, user: (
            f"Congratulations! {user.first_name} \n\n"
            f"Your reservation for {car.year} {car.name} {car.model} has been confirmed.\n \n"
            f"Your reservation for {car.year} {car.name} {car.model} has been confirmed.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            "Thank you for choosing Drive Easy!"
        )
    },
    'modified': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been modified',
        'message': lambda car, reservation, user: (
            f"Dear {user.first_name}, \n\n"
            f"Your reservation for {car.year} {car.name} {car.model} has been modified.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            f"You'll get an email once your reservation is confirmed"
            "Thank you for choosing Drive Easy!"
        )
    },
    'cancelled': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been cancelled',
        'message': lambda car, reservation, user: (
            f"Dear {user.first_name}, \n\n"
            f"Your reservation for {car.year} {car.name} {car.model} has been cancelled.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            "Visit our site now to make another reservation \n"
            f"https://drive-a.netlify.app \n"
            "Thank you for choosing Drive Easy!"
        )
    }
}

'''
Email status for guest Users
'''
GUEST_STATUS_EMAILS = {
    'confirmed': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been confirmed',
        'message': lambda car, reservation: (
            f"Congratulations! Your reservation for {car.year} {car.name} {car.model} has been confirmed.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            f"You'll get an email once your reservation is confirmed \n\n"
            f"Please note that this is a soft reservation and can be overriden by a registered user. Create an account now to secure your reservation"
            "Thank you for choosing Drive Easy!"
        )
    },
    'modified': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been modified',
        'message': lambda car, reservation: (
            f"Your reservation for {car.year} {car.name} {car.model} has been modified.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            f"You'll get an email once your reservation is confirmed \n\n"
            f"Please note that this is a soft reservation and can be overriden by a registered user. Create an account now to secure your reservation. \n"
            f"https://drive-a.netlify.app/login/ \n"
            "Thank you for choosing Drive Easy!"
        )
    },
    'cancelled': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been cancelled',
        'message': lambda car, reservation: (
            f"Your soft reservation for {car.year} {car.name} {car.model} has been cancelled.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            "Visit our site now to make another reservation \n"
            f"https://drive-a.netlify.app/ \n"
            "Thank you for choosing Drive Easy!"
        )
    },
    'overridden': {
        'subject': lambda car: f'Your reservation for {car.year} {car.name} {car.model} has been overridden',
        'message': lambda car, reservation: (
            f"Your reservation for {car.year} {car.name} {car.model} has been overridden by a registered user. The car is no longer reserved for you.\n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            "Create an account now to ensure your reservations are secure when next you reserve a car \n"
            f"https://drive-a.netlify.app \n"
            "Thank you for choosing Drive Easy!"
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
        if recipient and car:
            if instance.user and instance.status in REGISTERED_STATUS_EMAILS:
                subject = REGISTERED_STATUS_EMAILS[instance.status]['subject'](car)
                message = REGISTERED_STATUS_EMAILS[instance.status]['message'](car, instance, instance.user)
            if instance.status in GUEST_STATUS_EMAILS:
                subject = GUEST_STATUS_EMAILS[instance.status]['subject'](car)
                message = GUEST_STATUS_EMAILS[instance.status]['message'](car, instance)
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=True,
            )

'''
Convert soft reservations to firm reservations when guest user creates account.
'''
@receiver(post_save, sender=CustomUser)
def convert_guest_reservations(sender, instance, created, **kwargs):
    if created:
        soft_reservations = Reservation.objects.filter(
            user__isnull = True,
            guest_email__iexact = instance.email,
            reservation_type = 'soft'
        )

        if soft_reservations:
            for reservation in soft_reservations:
                reservation.user = instance
                reservation.reservation_type = 'firm'
                reservation.save()

                send_reservation_conversion_email(instance, reservation.car, reservation)

'''
Sends email notification about converted reservations 
'''
def send_reservation_conversion_email(user, car, reservation):
    try:
        subject = f"Your reservation for {car.year} {car.name} {car.model} is now a firm reservation"
        message = (
            f"Your soft reservation for {car.year} {car.name} {car.model} is now a firm reservation \n \n"
            f"Reservation Details:\n"
            f"Reservation ID: {reservation.id} \n"
            f"Start Date: {reservation.start_date}\n"
            f"End Date: {reservation.end_date}\n"
            f"Pickup Location: {reservation.pickup_location}\n"
            f"Dropoff Location: {reservation.dropoff_location}\n"
            f"Duration: {reservation.duration}\n"
            f"Price per day: {reservation.price_per_day}\n"
            f"Total Price: {reservation.total_price}\n"
            f"Status: {reservation.status}\n \n"
            "Thank you for choosing Drive Easy!"
        )

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=True
        )

    except Exception:
        return