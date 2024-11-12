from __future__ import annotations
from typing import TYPE_CHECKING
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from usuarios.managers import UsuarioManager
if TYPE_CHECKING:
    from todos import models as todo_types


class Usuario(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    objects = UsuarioManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("first_name",)

    # tipagens
    todo_set: models.Manager[todo_types.Todo]

    def __str__(self):
        return self.first_name
