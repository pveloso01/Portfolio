from core.views import healthz
from core.views_auth import (
    LoginView,  # TokenObtainPairView with ScopedRateThrottle
    LogoutView,  # Blacklist do refresh token
    RefreshView,  # TokenRefreshView with ScopedRateThrottle
    VerifyView,  # TokenVerifyView with ScopedRateThrottle
)
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from users.views_throttled import ThrottledUserViewSet

router = DefaultRouter()
router.register("users", ThrottledUserViewSet, basename="users")

urlpatterns = [
    # Admin & debug toolbar
    path("admin/", admin.site.urls),
    # JWT endpoints (views com throttling/escopos)
    path("api/v1/auth/jwt/create/", LoginView.as_view(), name="jwt-create"),
    path("api/v1/auth/jwt/refresh/", RefreshView.as_view(), name="jwt-refresh"),
    path("api/v1/auth/jwt/verify/", VerifyView.as_view(), name="jwt-verify"),
    path("api/v1/auth/logout/", LogoutView.as_view(), name="auth-logout"),
    # Djoser users (via o teu ViewSet throttled)
    path("api/v1/auth/", include(router.urls)),
    # Djoser core (registo, users, users/me, reset/activation se ativar por settings)
    path("api/v1/auth/", include("djoser.urls")),
    # Healthcheck (K8s/LB) e OpenAPI + Swagger
    path("healthz/", healthz),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    ]
