import django_filters # type: ignore
from .models import Shop

class ShopFilter(django_filters.FilterSet):
    min_rating = django_filters.NumberFilter(field_name="rating", lookup_expr='gte')
    category = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Shop
        fields = ['category', 'min_rating']