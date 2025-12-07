from django.contrib import admin

from .models import IPWhitelist, LoginAttempt, RefreshToken


@admin.register(RefreshToken)
class RefreshTokenAdmin(admin.ModelAdmin):
    """Admin for RefreshToken model."""

    list_display = (
        "user",
        "device_info",
        "ip_address",
        "created_at",
        "expires_at",
        "is_blacklisted",
    )
    list_filter = ("is_blacklisted", "created_at")
    search_fields = ("user__email", "ip_address", "jti")
    readonly_fields = (
        "user",
        "token",
        "jti",
        "created_at",
        "expires_at",
        "device_info",
        "ip_address",
        "user_agent",
        "blacklisted_at",
    )
    ordering = ("-created_at",)

    actions = ["blacklist_tokens"]

    def blacklist_tokens(self, request, queryset):
        """Blacklist selected tokens."""
        count = 0
        for token in queryset.filter(is_blacklisted=False):
            token.blacklist()
            count += 1
        self.message_user(request, f"{count} tokens blacklisted successfully.")

    blacklist_tokens.short_description = "Blacklist selected tokens"


@admin.register(IPWhitelist)
class IPWhitelistAdmin(admin.ModelAdmin):
    """Admin for IPWhitelist model."""

    list_display = ("ip_address", "description", "is_active", "created_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("ip_address", "description")
    ordering = ("-created_at",)


@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    """Admin for LoginAttempt model."""

    list_display = ("email", "ip_address", "success", "timestamp", "failure_reason")
    list_filter = ("success", "timestamp")
    search_fields = ("email", "ip_address")
    readonly_fields = (
        "email",
        "ip_address",
        "user_agent",
        "success",
        "failure_reason",
        "timestamp",
    )
    ordering = ("-timestamp",)

    def has_add_permission(self, request):
        """Login attempts are created by the system only."""
        return False

    def has_change_permission(self, request, obj=None):
        """Login attempts are read-only."""
        return False
