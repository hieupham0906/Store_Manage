from django.urls import path
from . import views

urlpatterns = [
    path('check', views.checkout_home, name='checkout'),
    path('/update_item', views.updateItem, name='update_item')
]