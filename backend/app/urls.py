from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewListView, SavedShopsView, ShopCreateView, ShopViewSet, ShopMenu, MenuView
from . import views

router = DefaultRouter()
router.register(r'shops',ShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('shops/', ShopCreateView.as_view()),
    path('savedShops/', SavedShopsView.as_view(), name='saved-shops'),
    path('shops/<int:shop_id>/reviews/', ReviewListView.as_view(), name='review-list-create'),
    path('shops/<int:shop_id>/menus/', MenuView.as_view()),
]