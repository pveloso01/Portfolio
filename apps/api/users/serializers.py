from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as BaseCreate
from djoser.serializers import UserSerializer as BaseUser

User = get_user_model()


class UserCreateSerializer(BaseCreate):
    class Meta(BaseCreate.Meta):
        model = User
        fields = ("id", "email", "password")


class UserSerializer(BaseUser):
    class Meta(BaseUser.Meta):
        model = User
        fields = ("id", "email", "first_name", "last_name")
