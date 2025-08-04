from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShopViewSet, ShopImageViewSet
from . import views

router = DefaultRouter()
router.register(r'shops',ShopViewSet)
router.register(r'shop-images', ShopImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]