from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(write_only=True, required=False)
    role = serializers.ChoiceField(
        choices=UserProfile.ROLE_CHOICES, write_only=True, required=False
    )
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role", "age"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        age = validated_data.pop("age", None)
        role = validated_data.pop("role", "U")

        # Create the user
        user = User(username=validated_data["username"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()

        # Create user profile
        UserProfile.objects.create(user_id=user, age=age, role=role)

        return user

    def to_representation(self, instance):
        # Include age and role in output
        ret = super().to_representation(instance)
        if hasattr(instance, "userprofile"):
            ret["age"] = instance.userprofile.age
            ret["role"] = instance.userprofile.get_role_display()
        return ret


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "user_id", "role", "age"]
