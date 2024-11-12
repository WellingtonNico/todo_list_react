from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.viewsets import ViewSet
from usuarios.api.serializers import RetrieveUserSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


class CustomObtainAuthToken(ObtainAuthToken):
    """
    view customizada para autenticação do usuário
    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user=user)
        token, _ = Token.objects.get_or_create(user=user)
        userSerializer = RetrieveUserSerializer(user)
        return Response({"token": token.key, "user": userSerializer.data})


class UsuarioLogadoViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)
    model = User
    http_method_names = ("get",)

    @action(detail=False, methods=("get",))
    def me(self, request):
        user = request.user
        serializer = RetrieveUserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=("post", "get"))
    def logout(self, request):
        logout(request)
        return Response({"message": "Logout efetuado com sucesso!"})
