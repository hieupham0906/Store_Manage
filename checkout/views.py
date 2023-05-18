
from django.http import JsonResponse
from django.shortcuts import render
from cart.models import Order, OrderDetail

from products.models import Category, Product

from .models import *
import json

def checkout_home(request):
    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = order['get_cart_items']

    context = {'items': items, 'order':order, 'cartItems': cartItems}
    return render(request,'checkout_home.html',context)

def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    customer = request.user
    product = Product.objects.get(id = productId)
    order, created =Order.objects.get_or_create(customer=customer)
    orderDetail, created = OrderDetail.objects.get_or_create(order=order, product = product)
    if action == 'add':
        orderDetail.quantity +=1
    elif action == 'remove':
        orderDetail.quantity -=1
    orderDetail.save()
    if orderDetail.quantity <=0:
        orderDetail.delete

    return JsonResponse('added', safe = False)
