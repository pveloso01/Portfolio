import uuid
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken as SimpleJWTRefreshToken

from .models import RefreshToken


def generate_tokens_for_user(user, request=None):
    """
    Generate access and refresh tokens for a user with rotation support.

    Args:
        user: User instance
        request: HTTP request object for device tracking

    Returns:
        dict: Contains 'access', 'refresh' tokens and metadata
    """
    # Generate tokens using SimpleJWT
    refresh = SimpleJWTRefreshToken.for_user(user)
    access = refresh.access_token

    # Extract device information from request
    device_info = ""
    ip_address = None
    user_agent = ""

    if request:
        ip_address = get_client_ip(request)
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        device_info = extract_device_info(user_agent)

    # Store refresh token in database for tracking and blacklisting
    expires_at = timezone.now() + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]

    RefreshToken.objects.create(
        user=user,
        token=str(refresh),
        jti=str(refresh["jti"]),
        expires_at=expires_at,
        device_info=device_info,
        ip_address=ip_address,
        user_agent=user_agent,
    )

    return {
        "access": str(access),
        "refresh": str(refresh),
        "access_expires_in": int(settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()),
        "refresh_expires_in": int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()),
    }


def blacklist_token(jti):
    """
    Blacklist a refresh token by its JTI.

    Args:
        jti: JWT ID of the token to blacklist

    Returns:
        bool: True if token was blacklisted, False if not found
    """
    try:
        token = RefreshToken.objects.get(jti=jti, is_blacklisted=False)
        token.blacklist()
        return True
    except RefreshToken.DoesNotExist:
        return False


def is_token_blacklisted(jti):
    """
    Check if a token is blacklisted.

    Args:
        jti: JWT ID to check

    Returns:
        bool: True if blacklisted, False otherwise
    """
    return RefreshToken.objects.filter(jti=jti, is_blacklisted=True).exists()


def cleanup_expired_tokens():
    """
    Remove expired tokens from the database.
    Should be run periodically via management command or celery task.
    """
    cutoff = timezone.now() - timedelta(days=30)  # Keep for 30 days after expiry
    expired_count = RefreshToken.objects.filter(expires_at__lt=cutoff).delete()[0]
    return expired_count


def revoke_all_user_tokens(user):
    """
    Blacklist all active refresh tokens for a user.
    Useful for logout from all devices or security incidents.

    Args:
        user: User instance

    Returns:
        int: Number of tokens blacklisted
    """
    tokens = RefreshToken.objects.filter(user=user, is_blacklisted=False)
    count = tokens.count()

    for token in tokens:
        token.blacklist()

    return count


def get_client_ip(request):
    """
    Extract client IP address from request, considering proxies.

    Args:
        request: HTTP request object

    Returns:
        str: IP address
    """
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0].strip()
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def extract_device_info(user_agent):
    """
    Extract basic device information from user agent string.

    Args:
        user_agent: User agent string

    Returns:
        str: Simplified device description
    """
    if not user_agent:
        return "Unknown"

    user_agent_lower = user_agent.lower()

    # Determine device type
    if "mobile" in user_agent_lower or "android" in user_agent_lower:
        device_type = "Mobile"
    elif "tablet" in user_agent_lower or "ipad" in user_agent_lower:
        device_type = "Tablet"
    else:
        device_type = "Desktop"

    # Determine browser
    if "firefox" in user_agent_lower:
        browser = "Firefox"
    elif "chrome" in user_agent_lower or "crios" in user_agent_lower:
        browser = "Chrome"
    elif "safari" in user_agent_lower:
        browser = "Safari"
    elif "edge" in user_agent_lower or "edg" in user_agent_lower:
        browser = "Edge"
    else:
        browser = "Other"

    return f"{device_type} - {browser}"

