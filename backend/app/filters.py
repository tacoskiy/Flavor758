import django_filters # type: ignore
from .models import Shop

class ShopFilter(django_filters.FilterSet):
    shopName = django_filters.CharFilter(field_name="name", lookup_expr='icontains')
    min_rating = django_filters.NumberFilter(field_name="rating", lookup_expr='gte')
    category = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Shop
        fields = ['shopName','category', 'min_rating']