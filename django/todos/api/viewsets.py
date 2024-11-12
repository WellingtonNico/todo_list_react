from rest_framework.viewsets import ModelViewSet
from todos.api.serializers import TodoSerializer
from usuarios.models import Usuario
from rest_framework.permissions import IsAuthenticated


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("post", "get", "put", "delete")

    def get_queryset(self):
        usuario: Usuario = self.request.user
        return usuario.todo_set.all()
