from rest_framework.throttling import AnonRateThrottle, UserRateThrottle


class LoginThrottle(AnonRateThrottle):
    """Throttle login attempts to prevent brute force attacks."""

    scope = "login"
    rate = "5/hour"


class TokenRefreshThrottle(UserRateThrottle):
    """Throttle token refresh requests."""

    scope = "token_refresh"
    rate = "10/hour"


class PasswordResetThrottle(AnonRateThrottle):
    """Throttle password reset requests to prevent abuse."""

    scope = "password_reset"
    rate = "3/hour"


class PasswordChangeThrottle(UserRateThrottle):
    """Throttle password change requests."""

    scope = "password_change"
    rate = "5/day"


class EmailVerificationThrottle(AnonRateThrottle):
    """Throttle email verification requests."""

    scope = "email_verification"
    rate = "3/hour"

