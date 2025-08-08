from rest_framework import serializers
from .models import Shop , ShopImage
from .models import Comment
from accounts.models import User

class ShopSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'shopName']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    shop = ShopSimpleSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'title', 'content', 'image', 'ratingStar', 'user', 'shop']

class ShopImageSerializer(serializers.ModelSerializer):
    shop = ShopSimpleSerializer(read_only=True)

    class Meta:
        model = ShopImage
        fields = ['id', 'img', 'caption', 'shop']

class ShopSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    shopImages = ShopImageSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        shopImages = request.FILES.getlist('shopImages')

        shop = Shop.objects.create(**validated_data)

        for image in shopImages:
            ShopImage.objects.create(shop=shop, img=image)
        
        return shop
