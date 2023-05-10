from django.db import models
from django.forms import ModelForm
from PIL import Image
from mptt.models import MPTTModel, TreeForeignKey

class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    # parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    # class MPTTMeta:
    #     order_insertion_by = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length = 100)
    color = models.CharField(max_length= 100)
    material = models.CharField(max_length= 100)
    price = models.IntegerField()
    image = models.ImageField(null = True, blank=True) 
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE,null=True, blank=True)
    def __str__(self):
        return self.name
