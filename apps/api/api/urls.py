from core.views import healthz
from core.views_auth import LogoutView
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    # Auth (Djoser + JWT)
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    path("api/v1/auth/logout/", LogoutView.as_view(), name="auth-logout"),
    # Healthcheck (used by LB/uptime/K8s)
    path("healthz/", healthz),
    # OpenAPI schema + Swagger UI (keep in dev or protect in prod)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
]
