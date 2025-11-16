from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth-logout"

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            raise ParseError("Missing 'refresh' token.")
        token = RefreshToken(refresh)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
