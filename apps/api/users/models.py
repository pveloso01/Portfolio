from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """Custom user manager for email-based authentication."""

    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular user with the given email and password."""
        if not email:
            raise ValueError("An email address is required")

        # Enforce single user constraint for portfolio
        if self.model.objects.exists():
            raise ValidationError("Only one user is allowed for this portfolio")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a superuser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if not extra_fields["is_staff"] or not extra_fields["is_superuser"]:
            raise ValueError("Superuser must have is_staff=True and is_superuser=True")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Custom user model with email as the primary identifier and enhanced security."""

    username = None
    email = models.EmailField(unique=True, db_index=True)

    # Security fields
    is_verified = models.BooleanField(
        default=False,
        help_text="Designates whether this user's email has been verified.",
    )
    last_password_change = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Timestamp of the last password change.",
    )
    failed_login_attempts = models.IntegerField(
        default=0,
        help_text="Number of consecutive failed login attempts.",
    )
    locked_until = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Account is locked until this timestamp if set.",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email

    def is_locked(self):
        """Check if the account is currently locked."""
        return bool(self.locked_until and self.locked_until > timezone.now())

    def reset_failed_attempts(self):
        """Reset failed login attempts counter."""
        self.failed_login_attempts = 0
        self.locked_until = None
        self.save(update_fields=["failed_login_attempts", "locked_until"])

    def increment_failed_attempts(self):
        """Increment failed login attempts and lock account if threshold exceeded."""
        self.failed_login_attempts += 1

        # Lock account for 30 minutes after 5 failed attempts
        if self.failed_login_attempts >= 5:
            self.locked_until = timezone.now() + timezone.timedelta(minutes=30)

        self.save(update_fields=["failed_login_attempts", "locked_until"])
