from django.shortcuts import render
from django.http import HttpResponse
from cart.models import Order

from products.models import Category, Product

def home(request):
    products =Product.objects.order_by("name")
    categories = Category.objects.all()

    if request.user.is_authenticated:
        customer = request.user
        order, created =  Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"
        context={'products': products,'cartItems':cartItems, 'user_not_login':user_not_login,'user_login':user_login}
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
        user_not_login = "show"
        user_login = "hidden"
        context={'categories': categories,'products': products,'cartItems':cartItems, 'user_not_login':user_not_login,'user_login':user_login}

    return render(request,'homepage.html',context)
