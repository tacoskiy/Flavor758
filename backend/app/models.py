from django.db import models
from accounts.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Shop(models.Model):
    shopName = models.CharField(max_length=255)
    coverImage = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=500)
    categories = models.CharField(max_length=255)
    lng = models.FloatField(default=136.8815)
    lat = models.FloatField(default=35.1709)

    def __str__(self):
        return self.shopName
    
    def get_average_rating(self):
        reviews = self.reviews.all()
        if not reviews:
            return 0
        total_rating = sum(review.ratingStar for review in reviews)
        return total_rating / len(reviews)
    
class Review(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    ratingStar = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.shop.shopName} - {self.ratingStar}"
    
class ShopMenu(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='menus')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.shop.shopName}"