from django.contrib import admin

from cart.models import Order, OrderDetail

admin.site.register(Order)
admin.site.register(OrderDetail)
