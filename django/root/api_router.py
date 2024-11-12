from rest_framework.routers import DefaultRouter
from todos.api.viewsets import TodoViewSet
from usuarios.api.viewsets import UsuarioLogadoViewSet


API_ROUTER = DefaultRouter()

API_ROUTER.register("todos", TodoViewSet, basename="todos")
API_ROUTER.register("auth", UsuarioLogadoViewSet, basename="usuario-logado")
