from django.shortcuts import render

from cart.models import Order

from .models import *
def search(request):
    if request.method == "POST":
        searched = request.POST["searched"]
        keys = Product.objects.filter(name__contains=searched)
    if request.user.is_authenticated:
        customer = request.user
        order, created =  Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = order['get_cart_items']
    products =Product.objects.order_by("name")
    return render(request,'search.html',{'searched':searched,'keys':keys,'products': products,'cartItems':cartItems})

def product_home(request):
    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        # user_not_login = "hidden"
        # user_login = "show"
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = order['get_cart_items']
        # user_not_login = "show"
        # user_login = "hidden"
    context = {'items': items, 'order':order,}
    products =Product.objects.order_by("name")
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'products': products,
        'cartItems':cartItems,
    #    'user_not_login':user_not_login,'user_login':user_login
        }
    return render(request,'home.html',context)
