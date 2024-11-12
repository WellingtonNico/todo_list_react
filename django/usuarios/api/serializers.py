from rest_framework.serializers import ModelSerializer, ListField
from usuarios.models import Usuario


class RetrieveUserSerializer(ModelSerializer):
    user_permissions = ListField(source="get_permissions_list", read_only=True)

    class Meta:
        model = Usuario
        fields = (
            "first_name",
            "last_name",
            "email",
            "user_permissions",
        )
