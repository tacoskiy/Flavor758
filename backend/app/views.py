from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from .filters import ShopFilter
from .models import Review, Shop, ShopMenu
from accounts.models import User
from .serializers import ReviewCreateSerializer, ReviewSerializer, ShopSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from rest_framework.views import APIView

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShopFilter

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ShopCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ShopSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SavedShopsView(APIView):
    permission_classes = [IsAuthenticated]

    def is_shop_saved(self, user, shop):
        return user.savedShops.filter(id=shop.id).exists()


    def get(self, request):
        shop_id = request.query_params.get('shop_id')
        if shop_id:
            try:
                shop = Shop.objects.get(id=shop_id)
            except Shop.DoesNotExist:
                return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)
            saved = self.is_shop_saved(request.user, shop)
            return Response({'saved': saved})
        
        # shop_id がなければ全部返す
        shops = request.user.savedShops.all()
        serializer = ShopSerializer(shops, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        shop_id = request.data.get('id')
        try:
            shop = Shop.objects.get(id=shop_id)
        except Shop.DoesNotExist:
            return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if shop in request.user.savedShops.all():
            request.user.savedShops.remove(shop)
        else:
            request.user.savedShops.add(shop)
        return Response({'message': 'Shop saved successfully'}, status=status.HTTP_201_CREATED)
    
    def delete(self, request, shop_id):
        try:
            shop = Shop.objects.get(id=shop_id)
        except Shop.DoesNotExist:
            return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)

        request.user.savedShops.remove(shop)
        return Response({'message': 'Shop removed from saved list'}, status=status.HTTP_204_NO_CONTENT)
    
class ReviewListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, shop_id):
        shop = get_object_or_404(Shop, id=shop_id)
        reviews = Review.objects.filter(shop=shop)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, shop_id):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            shop = get_object_or_404(Shop, id=shop_id)
            serializer.save(user=request.user, shop=shop)  # shopにオブジェクトを渡す
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MenuView(APIView):
    
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, shop_id):
        shop = get_object_or_404(Shop, id=shop_id)
        menus = ShopMenu.objects.filter(shop=shop)
        serializer = ShopSerializer(menus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, shop_id):
        shop = get_object_or_404(Shop, id=shop_id)
        serializer = ShopSerializer(data=request.data)
        if serializer.is_valid():
            menu = ShopMenu.objects.create(shop=shop, **serializer.validated_data)
            return Response(ShopSerializer(menu).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)