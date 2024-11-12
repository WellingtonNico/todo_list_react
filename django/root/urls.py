from django.contrib import admin
from django.urls import include, path

from root.api_router import API_ROUTER
from usuarios.api.viewsets import CustomObtainAuthToken

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(API_ROUTER.urls)),
    path("api/login/", CustomObtainAuthToken.as_view(), name="api-login"),
    path("api-auth/", include("rest_framework.urls")),
]
