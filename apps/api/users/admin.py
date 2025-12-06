from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom admin for User model."""

    list_display = (
        "email",
        "is_verified",
        "is_active",
        "is_staff",
        "last_login",
        "date_joined",
    )
    list_filter = ("is_verified", "is_active", "is_staff", "is_superuser")
    search_fields = ("email",)
    ordering = ("-date_joined",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                )
            },
        ),
        (
            "Security",
            {
                "fields": (
                    "is_verified",
                    "last_password_change",
                    "failed_login_attempts",
                    "locked_until",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )

    def has_add_permission(self, request):
        """Prevent adding more than one user (single-user portfolio)."""
        if User.objects.exists():
            return False
        return super().has_add_permission(request)
