import logging

from authentication.models import IPWhitelist
from django.conf import settings
from django.http import JsonResponse

logger = logging.getLogger(__name__)


class IPWhitelistMiddleware:
    """
    Middleware to restrict access to admin and sensitive endpoints by IP address.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.enabled = getattr(settings, "IP_WHITELIST_ENABLED", False)
        self.protected_paths = getattr(
            settings,
            "IP_WHITELIST_PROTECTED_PATHS",
            ["/admin/", "/api/v1/auth/"],
        )

    def __call__(self, request):
        if self.enabled and self._should_check_ip(request.path):
            client_ip = self._get_client_ip(request)

            if not self._is_ip_whitelisted(client_ip):
                logger.warning(
                    f"Blocked access from non-whitelisted IP: {client_ip} " f"to {request.path}"
                )
                return JsonResponse(
                    {
                        "detail": "Access denied. Your IP address is not whitelisted.",
                        "ip": client_ip,
                    },
                    status=403,
                )

        response = self.get_response(request)
        return response

    def _should_check_ip(self, path):
        """Check if the request path should be IP-protected."""
        return any(path.startswith(protected_path) for protected_path in self.protected_paths)

    def _is_ip_whitelisted(self, ip_address):
        """Check if an IP address is whitelisted."""
        # Check database whitelist
        if IPWhitelist.objects.filter(ip_address=ip_address, is_active=True).exists():
            return True

        # Check settings-based whitelist (for development)
        settings_whitelist = getattr(settings, "IP_WHITELIST_ADDRESSES", [])
        return ip_address in settings_whitelist

    def _get_client_ip(self, request):
        """Extract client IP address from request, considering proxies."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0].strip()
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
