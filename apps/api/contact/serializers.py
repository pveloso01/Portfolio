from rest_framework import serializers


class ContactFormSerializer(serializers.Serializer):
    """Serializer for contact form submissions."""

    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    subject = serializers.CharField(max_length=200, required=True)
    message = serializers.CharField(required=True)

    def validate_message(self, value):
        """Ensure message is not too short."""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value.strip()
