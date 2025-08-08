from django.conf import settings
from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profilePic = models.ImageField(upload_to='user_pic/',default='default.jpg')

    def __str__(self):
        return self.username
    
class SavedShops(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='savedShops')
    saved_at = models.DateTimeField(auto_now_add=True)
    shop = models.ForeignKey('app.Shop', on_delete=models.CASCADE, related_name='savedByUsers')

    def __str__(self):
        return f"{self.user.username} saved {self.shop.name}"
    
    class Meta:
        unique_together = ('user', 'shop')