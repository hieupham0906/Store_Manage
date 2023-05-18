from django.shortcuts import render, redirect


from .models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
def logoutPage(request):
    logout(request)
    return redirect('login')
def loginPage(request):
    if request.user.is_authenticated:
        user_not_login = "hidden"
        user_login = "show"
        return redirect('home')
    else:
        user_not_login = "show"
        user_login = "hidden"
    if request.method =="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('home')
        else: messages.info(request, 'user or password not correct!')

    context = {'user_not_login':user_not_login,'user_login':user_login}
    return render(request,'login.html',context)
def register(request):
    if request.user.is_authenticated:
        user_not_login = "hidden"
        user_login = "show"
    else:
        user_not_login = "show"
        user_login = "hidden"
    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('login')
    context = {'form' : form,'user_not_login': user_not_login,'user_login':user_login}

    return render(request,'register.html',context)
