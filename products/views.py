from django.shortcuts import render

from .models import *
def product_home(request):
    products =Product.objects.order_by("name")
    categories = Category.objects.all()
    context = {
        'categories': categories,
        'products': products
        }
    return render(request,'home.html',context)
