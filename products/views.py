import json
from django.shortcuts import render

from cart.models import Order, OrderDetail

from .models import *
def category(request):
    if request.user.is_authenticated:
        user_not_login = "hidden"
        user_login = "show"
    else:
        
        user_not_login = "show"
        user_login = "hidden"
    categories = Category.objects.all
    active_category = request.GET.get('category', '')
    if active_category:
        products = Product.objects.filter(category_id__name= active_category)
    context = {'user_not_login':user_not_login,'user_login':user_login,'active_category':active_category,'products':products, 'active_category':active_category}
    return render(request,'category.html',context) 
def search(request):
    if request.method == "POST":
        searched = request.POST["searched"]
        keys = Product.objects.filter(name__contains=searched)
    if request.user.is_authenticated:
        customer = request.user
        order, created =  Order.objects.get_or_create(customer=customer)
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
    products =Product.objects.order_by("name")
    return render(request,'search.html',{'searched':searched,'keys':keys,'products': products,'cartItems':cartItems,'user_not_login':user_not_login,'user_login':user_login})

def product_home(request):
    products =Product.objects.order_by("name")
    categories = Category.objects.all()
    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"
        context = {
        'categories': categories,
        'products': products,
        'cartItems':cartItems,
       'user_not_login':user_not_login,'user_login':user_login
        }
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
        user_not_login = "show"
        user_login = "hidden"
        context = {
        'categories': categories,
        'products': products,
        'cartItems':cartItems,
       'user_not_login':user_not_login,'user_login':user_login
        }
    # context = {'items': items, 'order':order,}
   
   
    return render(request,'home.html',context)
def product_detail(request, id):
    product = Product.objects.get(id = id)
    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"
        context = { 'product': product,
                'cartItems':cartItems,
                'user_not_login':user_not_login,'user_login':user_login}
    else:
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
        user_not_login = "show"
        user_login = "hidden"
        context = { 'product': product,
                'cartItems':cartItems,
                'user_not_login':user_not_login,'user_login':user_login}
  
    return render(request, 'product_details.html', context)

    
