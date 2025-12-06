from core.views import healthz
from core.views_auth import LogoutView
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin & debug toolbar
    path("admin/", admin.site.urls),
    # Auth endpoints
    path("api/v1/auth/logout/", LogoutView.as_view(), name="auth-logout"),
    # Djoser core (registo, users, users/me, reset/activation, JWT endpoints)
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    # Healthcheck (K8s/LB) e OpenAPI + Swagger
    path("healthz/", healthz),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    ]
