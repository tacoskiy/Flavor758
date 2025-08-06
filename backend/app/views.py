from django.shortcuts import render
from rest_framework import viewsets
from .models import Shop , ShopImage,Comment
from django.contrib.auth.models import User
from .serializers import ShopSerializer, ShopImageSerializer,UserSerializer,CommentSerializer


def index(request):
    return render(request, 'index.html')

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class ShopImageViewSet(viewsets.ModelViewSet):
    queryset = ShopImage.objects.all()
    serializer_class = ShopImageSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):  # ← 読み取り専用にすると安全
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


