from django.shortcuts import render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from .filters import ShopFilter
from .models import Shop , ShopImage,Comment
from accounts.models import User
from .serializers import ShopSerializer, ShopImageSerializer,UserSerializer,CommentSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

from rest_framework.views import APIView


def index(request):
    return render(request, 'index.html')

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShopFilter

class ShopImageViewSet(viewsets.ModelViewSet):
    queryset = ShopImage.objects.all()
    serializer_class = ShopImageSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ShopCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ShopSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)