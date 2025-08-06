from rest_framework import serializers
from .models import Shop , ShopImage

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields ='__all__ '