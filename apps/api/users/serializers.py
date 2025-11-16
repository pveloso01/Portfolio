from django.contrib.auth import get_user_model
from django.db import transaction
from djoser.serializers import SetPasswordSerializer
from djoser.serializers import UserCreateSerializer as BaseCreate
from djoser.serializers import UserSerializer as BaseUser
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

User = get_user_model()


class UserCreateSerializer(BaseCreate):
    class Meta(BaseCreate.Meta):
        model = User
        fields = ("id", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }


class UserSerializer(BaseUser):
    class Meta(BaseUser.Meta):
        model = User
        fields = ("id", "email", "first_name", "last_name")
        read_only_fields = ("id", "email", "first_name", "last_name")


class SetPasswordAndBlacklistSerializer(SetPasswordSerializer):
    @transaction.atomic
    def save(self, **kwargs):
        user = super().save(**kwargs)

        tokens = OutstandingToken.objects.filter(user=self.user).only("id")
        for t in tokens:
            BlacklistedToken.objects.get_or_create(token=t)

        return user
