from . import views
from django.urls import path

urlpatterns = [
    path("category/all", views.GetAllCategories.as_view(), name="all-categories"),
    path("product/all", views.GetAllProducts.as_view(), name="all-products"),
    path("category/create", views.CreateCategoryView.as_view(), name="create-category"),
    path("product/create", views.CreateProductView.as_view(), name="create-product"),
]
