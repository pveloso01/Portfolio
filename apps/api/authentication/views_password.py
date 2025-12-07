from core.throttling import PasswordChangeThrottle, PasswordResetThrottle
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .jwt_utils import revoke_all_user_tokens
from .serializers import (
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
)

User = get_user_model()


class PasswordChangeView(APIView):
    """Change password for authenticated user."""

    permission_classes = [IsAuthenticated]
    throttle_classes = [PasswordChangeThrottle]
    serializer_class = PasswordChangeSerializer

    @extend_schema(
        request=PasswordChangeSerializer,
        responses={
            200: {"description": "Password changed successfully"},
            400: {"description": "Validation error"},
            429: {"description": "Too many password change attempts"},
        },
    )
    def post(self, request):
        """
        Change password for the authenticated user.

        Requires old password for verification.
        Revokes all existing refresh tokens after password change.
        """
        serializer = self.serializer_class(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        user = request.user
        new_password = serializer.validated_data["new_password"]

        # Set new password
        user.set_password(new_password)
        user.last_password_change = timezone.now()
        user.save(update_fields=["password", "last_password_change"])

        # Revoke all existing tokens (force re-login)
        revoke_all_user_tokens(user)

        # TODO: Send email notification about password change

        return Response(
            {
                "detail": "Password changed successfully. "
                "Please log in again with your new password."
            },
            status=status.HTTP_200_OK,
        )


class PasswordResetRequestView(APIView):
    """Request password reset email."""

    permission_classes = [AllowAny]
    throttle_classes = [PasswordResetThrottle]
    serializer_class = PasswordResetRequestSerializer

    @extend_schema(
        request=PasswordResetRequestSerializer,
        responses={
            200: {"description": "Password reset email sent if user exists"},
            429: {"description": "Too many password reset requests"},
        },
    )
    def post(self, request):
        """
        Request password reset for an email address.

        Always returns success to prevent email enumeration.
        Sends reset email only if user exists and is active.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email, is_active=True)

            # Generate reset token
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            # TODO: Send password reset email with uid and token
            # The frontend should construct: /reset-password/{uid}/{token}

        except User.DoesNotExist:
            # Don't reveal that user doesn't exist (prevent enumeration)
            pass

        return Response(
            {
                "detail": "If an account exists with this email, "
                "you will receive password reset instructions."
            },
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(APIView):
    """Confirm password reset with token."""

    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    @extend_schema(
        request=PasswordResetConfirmSerializer,
        responses={
            200: {"description": "Password reset successful"},
            400: {"description": "Invalid token or validation error"},
        },
    )
    def post(self, request):
        """
        Reset password using token from email.

        Requires uid, token, and new password.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Decode user ID
            uid = force_str(urlsafe_base64_decode(serializer.validated_data["uid"]))
            user = User.objects.get(pk=uid)

            # Validate token
            token = serializer.validated_data["token"]
            if not default_token_generator.check_token(user, token):
                return Response(
                    {"detail": "Invalid or expired reset token."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Set new password
            new_password = serializer.validated_data["new_password"]
            user.set_password(new_password)
            user.last_password_change = timezone.now()
            user.save(update_fields=["password", "last_password_change"])

            # Revoke all existing tokens
            revoke_all_user_tokens(user)

            # TODO: Send confirmation email

            return Response(
                {"detail": "Password reset successful. Please log in with your new password."},
                status=status.HTTP_200_OK,
            )

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"detail": "Invalid reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )
