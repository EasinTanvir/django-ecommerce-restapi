from rest_framework import serializers
from .models import Category, Product
from django.utils.text import slugify


# =========================
# Product Serializer
# =========================
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=True,  # will raise error if category not provided
    )
    category_info = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "des",
            "price",
            "image",
            "category",
            "category_info",
        ]

    def get_category_info(self, obj):
        # Nested category info
        return {
            "id": obj.category.id,
            "name": obj.category.name,
            "slug": obj.category.slug,
        }

    def create(self, validated_data):
        # Auto-generate slug
        validated_data["slug"] = slugify(validated_data["title"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Update slug if title changes
        if "title" in validated_data:
            validated_data["slug"] = slugify(validated_data["title"])
        return super().update(instance, validated_data)


# =========================
# Category Serializer
# =========================
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "products"]

    def create(self, validated_data):
        # Auto-generate slug
        validated_data["slug"] = slugify(validated_data["name"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Update slug if name changes
        if "name" in validated_data:
            validated_data["slug"] = slugify(validated_data["name"])
        return super().update(instance, validated_data)
