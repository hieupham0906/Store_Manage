from django.contrib.auth.models import User
from django.db import models

from products.models import Product

class Order(models.Model):
    id = models.BigAutoField(primary_key=True)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.id)
    @property
    def get_cart_items(self):
        orderdetails = self.orderdetail_set.all()
        total = sum([item.quantity for item in orderdetails])
        return total
    @property
    def get_cart_total(self):
        orderdetails = self.orderdetail_set.all()
        total = sum([item.get_total for item in orderdetails])
        return total

class OrderDetail(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True,blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total
