from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_verification_email(user, uid, token):
    """Send email verification link to user."""
    verification_url = f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}"

    html_message = render_to_string(
        "auth_emails/verification.html",
        {"verification_url": verification_url, "user": user},
    )
    plain_message = strip_tags(html_message)

    send_mail(
        subject="Verify Your Email Address",
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )


def send_password_reset_email(user, uid, token):
    """Send password reset link to user."""
    reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"

    html_message = render_to_string(
        "auth_emails/password_reset.html",
        {"reset_url": reset_url, "user": user},
    )
    plain_message = strip_tags(html_message)

    send_mail(
        subject="Password Reset Request",
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )


def send_password_changed_email(user):
    """Send confirmation email after password change."""
    from django.utils import timezone

    html_message = render_to_string(
        "auth_emails/password_changed.html",
        {"user": user, "timestamp": timezone.now()},
    )
    plain_message = strip_tags(html_message)

    send_mail(
        subject="Password Changed Successfully",
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )


def send_security_alert_email(user, activity_type, ip_address, location="Unknown"):
    """Send security alert email for suspicious activity."""
    from django.utils import timezone

    html_message = render_to_string(
        "auth_emails/suspicious_activity.html",
        {
            "user": user,
            "activity_type": activity_type,
            "timestamp": timezone.now(),
            "ip_address": ip_address,
            "location": location,
        },
    )
    plain_message = strip_tags(html_message)

    send_mail(
        subject="Security Alert - Unusual Activity Detected",
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )
