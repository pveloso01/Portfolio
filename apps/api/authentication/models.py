from django.conf import settings
from django.db import models
from django.utils import timezone


class RefreshToken(models.Model):
    """Store refresh tokens with blacklisting capability."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="refresh_tokens",
    )
    token = models.CharField(max_length=500, unique=True, db_index=True)
    jti = models.CharField(max_length=255, unique=True, db_index=True,
                           help_text="JWT ID for token identification")
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_blacklisted = models.BooleanField(
        default=False,
        help_text="True if this token has been blacklisted (logout/rotation)",
    )
    blacklisted_at = models.DateTimeField(null=True, blank=True)

    # Device tracking
    device_info = models.CharField(max_length=255, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    class Meta:
        verbose_name = "Refresh Token"
        verbose_name_plural = "Refresh Tokens"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "-created_at"]),
            models.Index(fields=["jti"]),
        ]

    def __str__(self):
        status = "blacklisted" if self.is_blacklisted else "active"
        return f"{self.user.email} - {status} - {self.created_at}"

    def blacklist(self):
        """Blacklist this refresh token."""
        self.is_blacklisted = True
        self.blacklisted_at = timezone.now()
        self.save(update_fields=["is_blacklisted", "blacklisted_at"])

    def is_expired(self):
        """Check if the token has expired."""
        return timezone.now() > self.expires_at

    def is_valid(self):
        """Check if the token is valid (not blacklisted and not expired)."""
        return not self.is_blacklisted and not self.is_expired()


class IPWhitelist(models.Model):
    """IP addresses whitelisted for admin access."""

    ip_address = models.GenericIPAddressField(unique=True, db_index=True)
    description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Description of this IP (e.g., 'Home', 'Office')",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "IP Whitelist Entry"
        verbose_name_plural = "IP Whitelist Entries"
        ordering = ["-created_at"]

    def __str__(self):
        status = "active" if self.is_active else "inactive"
        return f"{self.ip_address} ({status}) - {self.description}"


class LoginAttempt(models.Model):
    """Track login attempts for security monitoring."""

    email = models.EmailField(db_index=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    success = models.BooleanField(default=False)
    failure_reason = models.CharField(max_length=255, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Login Attempt"
        verbose_name_plural = "Login Attempts"
        ordering = ["-timestamp"]
        indexes = [
            models.Index(fields=["email", "-timestamp"]),
            models.Index(fields=["ip_address", "-timestamp"]),
        ]

    def __str__(self):
        status = "SUCCESS" if self.success else "FAILED"
        return f"{status} - {self.email} from {self.ip_address} at {self.timestamp}"
