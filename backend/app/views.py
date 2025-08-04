from django.shortcuts import render
from rest_framework import viewsets
from .models import Shop , ShopImage
from .serializers import ShopSerializer, ShopImageSerializer

def index(request):
    return render(request, 'index.html')

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class ShopImageViewSet(viewsets.ModelViewSet):
    queryset = ShopImage.objects.all()
    serializer_class = ShopImageSerializer

