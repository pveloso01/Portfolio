from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer for API responses."""

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "is_verified", "date_joined")
        read_only_fields = ("id", "email", "is_verified", "date_joined")
