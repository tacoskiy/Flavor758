from django.db import models

# Create your models here.
class Shop(models.Model):
    shopName = models.CharField(max_length=255)
    coverImage = models.ImageField(upload_to='images/')
    discription = models.CharField(max_length=500)

    def __str__(self):
        return self.name

class ShopImage(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='shopImages')
    img = models.ImageField(upload_to='shop_images/')
    caption = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image of {self.shop.shopName}"