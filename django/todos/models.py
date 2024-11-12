from django.db import models
from usuarios.models import Usuario


class Todo(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    concluido = models.BooleanField(default=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
