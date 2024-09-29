from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AppViewset,
    BankStatisticViewSet,
    GetListAppViewSet,
    OrderViewSet,
    PriceByBankViewSet,
    ProfileViewSet,
    QuestGroupViewset,
    QuestInGroupViewset,
    QuestionsViewset,
    StatisticViewset,
    TestsScoreUserVSGroupViewset,
    TestsScoreViewset,
    UQAInGroupViewset,
    UserEmailViewSet,
    CountUnlookedOrdersViewset,
    UpdateLookedOrdersViewset,
    UserQuestAnsweredViewset
)

app_name = 'service'

router = DefaultRouter()

router.register('apps', AppViewset, basename='applications')
router.register('my_app', GetListAppViewSet, basename='my_apps')
router.register('order', OrderViewSet, basename='order')
router.register('user-profile', ProfileViewSet, basename='user-profile')
router.register('users-profiles', UserEmailViewSet, basename='users-profiles')
router.register('count_orders', CountUnlookedOrdersViewset, basename='count_orders')
router.register('looked', UpdateLookedOrdersViewset, basename='looked')
router.register('byprice', PriceByBankViewSet, basename='byprice')
router.register('complete', BankStatisticViewSet, basename='complete')
router.register('questions', QuestionsViewset, basename='questions')
router.register('quest_group', QuestGroupViewset, basename='quest_group')
router.register('quest_in_group', QuestInGroupViewset, basename='quest_in_group')
router.register('score', TestsScoreViewset, basename='score')
router.register('uniqe_score', TestsScoreUserVSGroupViewset, basename='uniqe_score')
router.register('uqa', UserQuestAnsweredViewset, basename='uqa')
router.register('uqa_in_group', UQAInGroupViewset, basename='uqa_in_group')
router.register('statistic', StatisticViewset, basename='statistic')

urlpatterns = [
    path('', include(router.urls)),
]