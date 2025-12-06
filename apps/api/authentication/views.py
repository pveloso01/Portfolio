from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken as SimpleJWTRefreshToken

from core.throttling import LoginThrottle, TokenRefreshThrottle

from .jwt_utils import blacklist_token, generate_tokens_for_user
from .serializers import LoginSerializer, LogoutSerializer, TokenRefreshSerializer


class LoginView(APIView):
    """Authenticate user and return JWT tokens."""

    permission_classes = [AllowAny]
    throttle_classes = [LoginThrottle]
    serializer_class = LoginSerializer

    @extend_schema(
        request=LoginSerializer,
        responses={
            200: {
                "type": "object",
                "properties": {
                    "access": {"type": "string"},
                    "refresh": {"type": "string"},
                    "access_expires_in": {"type": "integer"},
                    "refresh_expires_in": {"type": "integer"},
                    "user": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer"},
                            "email": {"type": "string"},
                            "is_verified": {"type": "boolean"},
                        },
                    },
                },
            },
            400: {"description": "Invalid credentials or validation error"},
            429: {"description": "Too many login attempts"},
        },
    )
    def post(self, request):
        """
        Authenticate user with email and password.

        Returns JWT access and refresh tokens on successful authentication.
        """
        serializer = self.serializer_class(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        # Update last login
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        # Generate tokens
        tokens = generate_tokens_for_user(user, request)

        return Response(
            {
                **tokens,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "is_verified": user.is_verified,
                },
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    """Blacklist refresh token to logout user."""

    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    @extend_schema(
        request=LogoutSerializer,
        responses={
            205: {"description": "Logged out successfully"},
            400: {"description": "Invalid or missing refresh token"},
        },
    )
    def post(self, request):
        """
        Logout user by blacklisting their refresh token.

        Requires the refresh token to be provided in the request body.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data["refresh"]
            token = SimpleJWTRefreshToken(refresh_token)

            # Blacklist the token
            jti = token["jti"]
            blacklist_token(jti)

            return Response(
                {"detail": "Logged out successfully."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except TokenError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class TokenRefreshView(APIView):
    """Refresh access token using refresh token."""

    permission_classes = [AllowAny]
    throttle_classes = [TokenRefreshThrottle]
    serializer_class = TokenRefreshSerializer

    @extend_schema(
        request=TokenRefreshSerializer,
        responses={
            200: {
                "type": "object",
                "properties": {
                    "access": {"type": "string"},
                    "refresh": {"type": "string"},
                    "access_expires_in": {"type": "integer"},
                },
            },
            401: {"description": "Invalid or expired refresh token"},
            429: {"description": "Too many refresh requests"},
        },
    )
    def post(self, request):
        """
        Generate new access token from refresh token.

        With token rotation enabled, also returns a new refresh token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data["refresh"]
            token = SimpleJWTRefreshToken(refresh_token)

            # Generate new access token
            access_token = str(token.access_token)

            # With rotation, get new refresh token
            new_refresh = str(token)

            return Response(
                {
                    "access": access_token,
                    "refresh": new_refresh,
                    "access_expires_in": 900,  # 15 minutes
                },
                status=status.HTTP_200_OK,
            )
        except (InvalidToken, TokenError) as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class TokenVerifyView(APIView):
    """Verify if a token is valid."""

    permission_classes = [AllowAny]

    @extend_schema(
        request={
            "type": "object",
            "properties": {"token": {"type": "string"}},
        },
        responses={
            200: {"description": "Token is valid"},
            401: {"description": "Token is invalid or expired"},
        },
    )
    def post(self, request):
        """
        Verify if a JWT token is valid.

        Checks token signature, expiration, and blacklist status.
        """
        token_str = request.data.get("token")

        if not token_str:
            return Response(
                {"detail": "Token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # This will raise an exception if invalid
            SimpleJWTRefreshToken(token_str)

            return Response(
                {"detail": "Token is valid."},
                status=status.HTTP_200_OK,
            )
        except (InvalidToken, TokenError):
            return Response(
                {"detail": "Token is invalid or expired."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
