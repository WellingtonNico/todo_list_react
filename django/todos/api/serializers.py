from rest_framework import serializers
from todos.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    instance: Todo

    class Meta:
        model = Todo
        fields = "id", "titulo", "descricao", "concluido", "created_at"
        read_only_fields = ("created_at", "id")

    def validate_concluido(self, value):
        if self.instance and self.instance.concluido and not value:
            raise serializers.ValidationError(
                "It's not possible to unmark a completed task."
            )
        return value

    def create(self, validated_data):
        validated_data["usuario"] = self.context["request"].user
        return super().create(validated_data)
