from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth-login"


class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth-refresh"


class VerifyView(TokenVerifyView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth-verify"


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth-logout"

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            raise ParseError("Missing 'refresh' token.")
        try:
            token = RefreshToken(refresh)
            token.blacklist()  # requires 'rest_framework_simplejwt.token_blacklist' and migrations
        except TokenError as err:
            raise ParseError("Invalid or expired refresh token.") from err

        return Response(status=status.HTTP_205_RESET_CONTENT)
