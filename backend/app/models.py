from django.db import models
from django.contrib.auth.models import AbstractUser

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
    
    id = models.IntegerField("ID", primary_key=True)
    title=models.CharField("コメントタイトル",max_length=200)
    content=models.TextField("コメント本文")
    image=models.ImageField("添付写真",upload_to='comments/', null=True, blank=True)
    ratingStar=models.IntegerField("星")

    def __str__(self):
        return self.id
    
    # class CustomUser(AbstractUser):
    #     id = models.IntegerField("ID", primary_key=True)
    #     name = models.CharField("アカウント名" , max_length=100)
    #     password = models.CharField("パスワード", max_length=100)
    #     profilePic = models.ImageField("プロフィール画像", upload_to='profile_images/', null=True, blank=True)