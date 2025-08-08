from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

from django.conf import settings

# Create your models here.
class Shop(models.Model):
    shopName = models.CharField(max_length=255)
    coverImage = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=500)
    category = models.CharField(max_length = 100, null=True, blank=True)
    lng = models.FloatField(default=136.8815)
    lat = models.FloatField(default=35.1709)

    def __str__(self):
        return self.shopName

class ShopImage(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='shopImages')
    img = models.ImageField(upload_to='shop_images/')
    caption = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image of {self.shop.shopName}"
    

class Comment(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='comments')
    title=models.CharField(max_length=200)
    content=models.TextField()
    image=models.ImageField(upload_to='comments/', null=True, blank=True)
    ratingStar=models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.title