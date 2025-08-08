from django.contrib import admin
from .models import Shop, ShopImage, Comment

# Register your models here.
admin.site.register(Shop)
admin.site.register(ShopImage)
admin.site.register(Comment)