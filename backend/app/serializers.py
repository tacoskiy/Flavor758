from rest_framework import serializers
from .models import Shop , ShopImage
from django.contrib.auth.models import User
from .models import Comment

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields ='__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CommentSerializer(serializers.ModelSerializer):
    account = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'title', 'content', 'image', 'ratingStar', 'account']
