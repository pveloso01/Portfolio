from core.views import healthz
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin & debug toolbar
    path("admin/", admin.site.urls),
    # Authentication endpoints
    path("api/v1/auth/", include("authentication.urls")),
    # Contact form
    path("api/v1/contact/", include("contact.urls")),
    # Healthcheck (K8s/LB) e OpenAPI + Swagger
    path("healthz/", healthz),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    ]
