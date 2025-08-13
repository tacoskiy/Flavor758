from django.conf import settings
from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profilePic = models.ImageField(upload_to='user_pic/',default='default.jpg')
    savedShops = models.ManyToManyField('app.Shop', related_name='savedByUsers')

    def __str__(self):
        return self.username