from django_filters import rest_framework as filters
from django.db.models import Subquery

from users.models import User
from service.models import Order, Profile, QuestGroup, UserQuestAnswered

from recipes.models import Ingredient, Recipe, Tag


class RecipeFilterMainPage(filters.FilterSet):

    tags = filters.ModelMultipleChoiceFilter(
        queryset=Tag.objects.all(),
        field_name='tags__slug',
        to_field_name='slug',
    )


class TagsFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class RecipeFilter(filters.FilterSet):
    tags = filters.ModelMultipleChoiceFilter(
        queryset=Tag.objects.all(),
        field_name='tags__slug',
        to_field_name='slug',
    )
    is_favorited = filters.BooleanFilter(method='get_is_favorited')
    is_in_shopping_cart = filters.BooleanFilter(
        method='get_is_in_shopping_cart'
    )

    def get_is_favorited(self, queryset, name, value):
        if value:
            return queryset.filter(
                favorite_recipes__user=self.request.user
            )
        return queryset.all()

    def get_is_in_shopping_cart(self, queryset, name, value):
        if value:
            return queryset.filter(
                cart_recipes__user=self.request.user
            )
        return queryset.all()

    class Meta:
        model = Recipe
        fields = ('tags', 'author', 'is_favorited', 'is_in_shopping_cart',)


class IngredientFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='istartswith', )

    class Meta:
        model = Ingredient
        fields = ('name', 'measurement_unit')


class BankInOrder(filters.FilterSet):
    email = filters.CharFilter(field_name='email', lookup_expr='istartswith')

    class Meta:
        model = Order
        fields = '__all__'


class EmailInProfile(filters.FilterSet):
    email = filters.CharFilter(field_name='email', lookup_expr='istartswith')
    # agent = filters.ModelMultipleChoiceFilter(
    #     queryset = User.objects.all(),
    #     field_name = 'agent__profile__email'   
    # )

    class Meta:
        model = User
        fields = ('email',)


class StatisticDateFilter(filters.FilterSet):
    date_update_after = filters.DateFilter('date_update', lookup_expr='gte')
    date_update_before = filters.DateFilter('date_update', lookup_expr='lte')
    # date_update_after = filters.DateFromToRangeFilter()
    # date_update_before = filters.DateFromToRangeFilter()

    class Meta:
        model = Order
        # fields = ('date_update_after', 'date_update_before')
        fields = ('date_update_after', 'date_update_before')


class UQAInGroup(filters.FilterSet):
    group = filters.CharFilter(field_name='quest__group', lookup_expr='exact')

    class Meta:
        model = UserQuestAnswered
        fields = ('group',)
