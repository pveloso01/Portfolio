from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from core.serializers import LogoutSerializer


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
    serializer_class = LogoutSerializer

    @extend_schema(
        summary="Logout (blacklist refresh token)",
        description=(
            "Blacklists the supplied refresh token. The server returns "
            "**205 Reset Content** to indicate the client should clear "
            "local auth state (e.g., reset a form or session UI)."
        ),
        request=LogoutSerializer,
        responses={
            205: OpenApiResponse(
                description="Refresh token blacklisted; client should reset state."
            ),
            400: OpenApiResponse(description="Missing or invalid refresh token."),
            401: OpenApiResponse(description="Authentication required."),
        },
        examples=[
            OpenApiExample(
                "Logout request",
                value={"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi..."},
                request_only=True,
            ),
        ],
        tags=["auth"],
    )
    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            raise ParseError("Missing 'refresh' token.")
        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError as err:
            raise ParseError("Invalid or expired refresh token.") from err

        return Response(status=status.HTTP_205_RESET_CONTENT)
