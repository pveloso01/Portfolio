from django.urls import path

from .views import LoginView, LogoutView, TokenRefreshView, TokenVerifyView
from .views_password import (
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
)
from .views_verification import (
    ResendVerificationEmailView,
    SendVerificationEmailView,
    VerifyEmailView,
)

app_name = "authentication"

urlpatterns = [
    # Token management
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
    # Password management
    path("password/change/", PasswordChangeView.as_view(), name="password-change"),
    path("password/reset/", PasswordResetRequestView.as_view(), name="password-reset-request"),
    path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    # Email verification
    path("email/verify/", VerifyEmailView.as_view(), name="email-verify"),
    path("email/send-verification/", SendVerificationEmailView.as_view(), name="send-verification"),
    path("email/resend-verification/", ResendVerificationEmailView.as_view(), name="resend-verification"),
]

