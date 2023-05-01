from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_home, name='product_home')
 
]