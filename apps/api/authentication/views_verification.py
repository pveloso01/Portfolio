from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.throttling import EmailVerificationThrottle

from .serializers import EmailVerificationSerializer, ResendVerificationSerializer

User = get_user_model()


class SendVerificationEmailView(APIView):
    """Send email verification link to user."""

    permission_classes = [IsAuthenticated]
    throttle_classes = [EmailVerificationThrottle]

    @extend_schema(
        responses={
            200: {"description": "Verification email sent"},
            400: {"description": "Email already verified"},
            429: {"description": "Too many verification requests"},
        },
    )
    def post(self, request):
        """
        Send verification email to the authenticated user.

        Only sends if email is not already verified.
        """
        user = request.user

        if user.is_verified:
            return Response(
                {"detail": "Email is already verified."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Generate verification token
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # TODO: Send verification email with uid and token
        # The frontend should construct: /verify-email/{uid}/{token}

        return Response(
            {"detail": "Verification email sent."},
            status=status.HTTP_200_OK,
        )


class VerifyEmailView(APIView):
    """Verify email with token."""

    permission_classes = [AllowAny]
    serializer_class = EmailVerificationSerializer

    @extend_schema(
        request=EmailVerificationSerializer,
        responses={
            200: {"description": "Email verified successfully"},
            400: {"description": "Invalid or expired token"},
        },
    )
    def post(self, request):
        """
        Verify user email using token from verification email.

        Requires uid and token from the verification link.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Decode user ID
            uid = force_str(urlsafe_base64_decode(serializer.validated_data["uid"]))
            user = User.objects.get(pk=uid)

            # Check if already verified
            if user.is_verified:
                return Response(
                    {"detail": "Email is already verified."},
                    status=status.HTTP_200_OK,
                )

            # Validate token
            token = serializer.validated_data["token"]
            if not default_token_generator.check_token(user, token):
                return Response(
                    {"detail": "Invalid or expired verification token."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Mark as verified
            user.is_verified = True
            user.save(update_fields=["is_verified"])

            # TODO: Send confirmation email

            return Response(
                {"detail": "Email verified successfully."},
                status=status.HTTP_200_OK,
            )

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"detail": "Invalid verification link."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ResendVerificationEmailView(APIView):
    """Resend verification email (for non-authenticated users)."""

    permission_classes = [AllowAny]
    throttle_classes = [EmailVerificationThrottle]
    serializer_class = ResendVerificationSerializer

    @extend_schema(
        request=ResendVerificationSerializer,
        responses={
            200: {"description": "Verification email sent if user exists"},
            429: {"description": "Too many verification requests"},
        },
    )
    def post(self, request):
        """
        Resend verification email to an email address.

        Always returns success to prevent email enumeration.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email, is_active=True)

            if not user.is_verified:
                # Generate verification token
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)

                # TODO: Send verification email with uid and token

        except User.DoesNotExist:
            # Don't reveal that user doesn't exist
            pass

        return Response(
            {
                "detail": "If an unverified account exists with this email, "
                "you will receive a verification link."
            },
            status=status.HTTP_200_OK,
        )

