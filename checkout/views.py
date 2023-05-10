from django.shortcuts import render
from cart.models import Order

from products.models import Category, Product

from .models import *

def checkout_home(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
    context = {'items': items, 'order':order}
    return render(request,'checkout_home.html',context)
