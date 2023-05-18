from django.shortcuts import render, redirect

from cart.models import Order
from products.models import Category, Product


from .models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
def logoutPage(request):
    logout(request)
    return redirect('login')
def loginPage(request):
    categories = Category.objects.all()
    products =Product.objects.order_by("name")

    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"
        return redirect('home')
    else:
        user_not_login = "show"
        user_login = "hidden"
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
    if request.method =="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('home')
        else: messages.info(request, 'user or password not correct!')

    context = {'categories': categories,'products': products,'items': items, 'order':order, 'cartItems': cartItems,'user_not_login': user_not_login,'user_login':user_login}
    return render(request,'login.html',context)
def register(request):
    categories = Category.objects.all()
    products =Product.objects.order_by("name")

    if request.user.is_authenticated:
        customer = request.user
        order, created =    Order.objects.get_or_create(customer=customer)
        items = order.orderdetail_set.all()
        cartItems = order.get_cart_items
        user_not_login = "hidden"
        user_login = "show"
    else:
        user_not_login = "show"
        user_login = "hidden"
        items=[]
        order={'order.get_cart_items' :0, 'order.get_cart_total' : 0}
        cartItems = 0
    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('login')
    context = {'categories': categories,'products': products,'items': items, 'order':order, 'cartItems': cartItems, 'form' : form,'user_not_login': user_not_login,'user_login':user_login}

    return render(request,'register.html',context)
