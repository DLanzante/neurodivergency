from api.models import Post
from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'bio', 'is_neurodivergent', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def validate_content(self, value):
        if '<script>' in value:
            raise ValidationError('Script tags are not allowed.')
        return value

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'content', 'created_at']

        def validate_content(self, value):
            if '<script>' in value:
                raise ValidationError('Script tags are not allowed.')
            return value