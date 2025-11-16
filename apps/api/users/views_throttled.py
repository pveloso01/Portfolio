from djoser.views import UserViewSet as DjoserUserViewSet
from rest_framework.throttling import ScopedRateThrottle


class ThrottledUserViewSet(DjoserUserViewSet):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope_map = {
        "create": "auth-register",
        "activation": "auth-activate",
        "resend_activation": "auth-activate-resend",
        "reset_password": "auth-reset-password",
        "reset_password_confirm": "auth-reset-password-confirm",
        "set_password": "auth-set-password",
        "reset_username": "auth-reset-email",
        "reset_username_confirm": "auth-reset-email-confirm",
        "set_username": "auth-set-email",
    }

    def get_throttles(self):
        # Djoser usa ViewSet; 'self.action' indica o método atual.
        self.throttle_scope = self.throttle_scope_map.get(self.action)
        return super().get_throttles()
