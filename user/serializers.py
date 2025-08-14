from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role", "age"]

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # Create the User first
        user = User(username=validated_data["username"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()

        # Create the profile with default role
        UserProfile.objects.create(
            user_id=user,
            age=validated_data.get("age", None),  # set if provided
            role=validated_data.get("role", "U"),  # default role
        )

        return user

    def get_role(self, obj):
        if hasattr(obj, "userprofile"):
            return obj.userprofile.get_role_display()
        return None

    def get_age(self, obj):
        if hasattr(obj, "userprofile"):
            return obj.userprofile.age
        return None


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "user_id", "role", "age"]
