import django_filters # type: ignore
from .models import Shop
from django.db.models import Q


class ShopFilter(django_filters.FilterSet):
    shopName = django_filters.CharFilter(field_name="name", lookup_expr='icontains', label="店舗名")
    min_rating = django_filters.NumberFilter(field_name="ratingStar", lookup_expr='gte', label="最低評価")
    categories = django_filters.CharFilter(method='filter_categories')

    class Meta:
        model = Shop
        fields = ['shopName', 'categories', 'min_rating']

    def filter_categories(self, queryset, name, value):
    # valueは "Tenmusu,Onigiri;Pasta,meat" のように区切りを変えて受け取る想定
    # セミコロン(;)でAND、カンマ(,)でORを表す
    
    # 例: categories=Tenmusu,Onigiri;Pasta,meat
    
        and_groups = [group.strip() for group in value.split(';') if group.strip()]
        for group in and_groups:
            or_values = [v.strip() for v in group.split(',') if v.strip()]
            or_query = Q()
            for val in or_values:
                or_query |= Q(categories__icontains=val)
            queryset = queryset.filter(or_query)
        return queryset.distinct()