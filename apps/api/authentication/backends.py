from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.utils import timezone

from .models import LoginAttempt

User = get_user_model()


class EmailAuthenticationBackend(ModelBackend):
    """
    Custom authentication backend that uses email instead of username.
    Includes account lockout and failed login tracking.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Authenticate a user by email and password.

        Args:
            request: HTTP request object
            username: Email address (named username for compatibility)
            password: User password
            **kwargs: Additional arguments

        Returns:
            User instance if authentication successful, None otherwise
        """
        # Support both 'username' and 'email' parameters
        email = kwargs.get("email", username)

        if email is None or password is None:
            return None

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Log failed attempt for non-existent email
            self._log_failed_attempt(request, email, "User does not exist")
            return None

        # Check if account is locked
        if user.is_locked():
            self._log_failed_attempt(request, email, "Account is locked")
            return None

        # Check if account is active
        if not user.is_active:
            self._log_failed_attempt(request, email, "Account is inactive")
            return None

        # Verify password
        if user.check_password(password):
            # Password correct - reset failed attempts and log success
            user.reset_failed_attempts()
            self._log_successful_attempt(request, email)
            return user
        else:
            # Password incorrect - increment failed attempts
            user.increment_failed_attempts()
            reason = f"Invalid password (attempt {user.failed_login_attempts})"
            self._log_failed_attempt(request, email, reason)
            return None

    def get_user(self, user_id):
        """
        Get user by ID.

        Args:
            user_id: User primary key

        Returns:
            User instance or None
        """
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def _log_successful_attempt(self, request, email):
        """Log successful login attempt."""
        if request:
            LoginAttempt.objects.create(
                email=email,
                ip_address=self._get_client_ip(request),
                user_agent=request.META.get("HTTP_USER_AGENT", "")[:500],
                success=True,
            )

    def _log_failed_attempt(self, request, email, reason):
        """Log failed login attempt."""
        if request:
            LoginAttempt.objects.create(
                email=email,
                ip_address=self._get_client_ip(request),
                user_agent=request.META.get("HTTP_USER_AGENT", "")[:500],
                success=False,
                failure_reason=reason,
            )

    def _get_client_ip(self, request):
        """Extract client IP address from request."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0].strip()
        else:
            ip = request.META.get("REMOTE_ADDR", "unknown")
        return ip

