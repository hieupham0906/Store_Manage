from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_home, name='product_home'),
    path('product_detail/<int:id>', views.product_detail, name='product_detail'),
    path('search', views.search, name='search'),
    path('category', views.category, name='category')

 
]