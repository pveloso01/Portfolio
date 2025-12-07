from django.conf import settings
from django.core.mail import send_mail
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactFormSerializer


@method_decorator(csrf_exempt, name="dispatch")
class ContactFormView(APIView):
    """
    API endpoint for contact form submissions.
    Sends an email to the site owner with the message.
    """

    permission_classes = []  # Public endpoint, no authentication required
    throttle_classes = []  # Add throttling if needed

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Extract validated data
        name = serializer.validated_data["name"]
        email = serializer.validated_data["email"]
        subject = serializer.validated_data["subject"]
        message = serializer.validated_data["message"]

        # Prepare email content
        email_subject = f"Portfolio Contact: {subject}"
        email_message = f"""
New contact form submission from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent from your portfolio contact form.
Reply directly to: {email}
"""

        try:
            # Send email
            send_mail(
                subject=email_subject,
                message=email_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )

            return Response(
                {"message": "Thank you for your message! I'll get back to you soon."},
                status=status.HTTP_200_OK,
            )

        except Exception:
            return Response(
                {"error": "Failed to send message. Please try again or email directly."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
