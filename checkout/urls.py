from django.urls import path
from . import views

urlpatterns = [
    path('', views.checkout_home, name='checkout')
 
]