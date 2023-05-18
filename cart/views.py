from django.shortcuts import render

from products.models import Category, Product

from .models import *
def cart_home(request):
    products =Product.objects.order_by("name")
    categories = Category.objects.all()
    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"

    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
        user_not_login = "show"
        user_login = "hidden"

    context = {'categories': categories,'products': products,'items': items, 'order':order, 'cartItems': cartItems, 'user_not_login':user_not_login,'user_login':user_login}
    return render(request,'cart_home.html',context)

