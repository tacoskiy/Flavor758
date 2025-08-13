from rest_framework import serializers
from .models import Review, Shop
from accounts.models import User

class ShopSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'shopName']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']

        shop = Shop.objects.create(**validated_data)
        
        return shop

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # ユーザー名を返す
    shop = serializers.StringRelatedField(read_only=True)  # 店舗名を返す

    class Meta:
        model = Review
        fields = ['id', 'shop', 'user', 'ratingStar', 'comment', 'created_at']

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['ratingStar', 'comment']

    def create(self, validated_data):
        request = self.context['request']
        shop = validated_data.pop('shop')
        review = Review.objects.create(user=request.user, shop=shop, **validated_data)
        return review