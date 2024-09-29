from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, status, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from core.filters import BankInOrder, EmailInProfile, StatisticDateFilter, UQAInGroup

from .serializers import (AppCreateSerializer, AppGetAnonimousSerializer,
                          AppGetSerializer, BankStatisticSerializer, GetUserQuestAnsweredSerializer, OrderCreateSerializer, GetOrderSerializer,
                          OrderUpdateSerializer, GetProfilesSerializer, GetEmailUserSerializer,
                          PostEmailUserSerializer, PostProfilesSerializer, CountUnlookedOrdersSerializer, PriceByBankSerializer, QuestGroupSerializer, QuestInGroupSerializer, QuestionsSerializer, TestsScoreCreateSerializer, TestsScoreSerializer, UQAWithGroupSerializer, UserQuestAnsweredSerializer)

from .models import Application, PriceByBank, Profile, QuestGroup, Questions, TestsScore, User, Order, UserQuestAnswered

class AppViewset(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_serializer_class(self):

        if self.request.method in ('POST', 'PATCH', 'DELETE'):
            return AppCreateSerializer
        if self.request.user.is_anonymous:
            return AppGetAnonimousSerializer
        return AppGetSerializer
    
    @action(
        detail=True,
        methods=['POST', 'PUTCH', 'PUT', 'DELETE'],
        url_path='create',
        permission_classes=(IsAuthenticated, )
    )
    def create_app(self, request, *args, **kwargs):
        agent = self.request.user
        if request.method == 'POST':
            serializer = AppCreateSerializer(agent=agent)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    # @action(
    #     detail=False,
    #     methods=['GET'],
    #     url_path='my_apps',
    #     permission_classes=(IsAuthenticated, )
    # )
    # def get_my_apps(self, request):
    #     agent = self.request.user
        
    #     if request.method == 'GET' and agent:
    #         self.queryset = Application.objects.filter(agent=agent)
    #         print(self.queryset)
    #         serializer = AppGetSerializer(many=True)
    #         print(serializer)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     if not agent:
    #         return Response(status=status.HTTP_401_UNAUTHORIZED)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)
    

class GetListAppViewSet(viewsets.ModelViewSet, mixins.ListModelMixin):
    serializer_class = AppGetSerializer

    def get_queryset(self):
        agent = self.request.user
        queryset = Application.objects.filter(agent=agent.id)
        print(agent.id)
        return queryset
    

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-pub_date')
    filter_backends = (DjangoFilterBackend,)
    filterset_class = BankInOrder
    search_fields = ('email',)

    def get_serializer_class(self):
        if self.request.method in ('POST', ):
            return OrderCreateSerializer
        if self.request.method in ('PUT', 'PATCH'):
            return OrderUpdateSerializer
        return GetOrderSerializer
    
    @action(
        detail=False,
        url_path='orders'
    )
    def get_orders(self):
        pass

# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = GetProfilesSerializer

#     @action(
#             detail=True,
#             methods=['GET'],
#             url_path='profile'
#     )
#     def get_profile(self, request, pk):
#         profile = get_object_or_404(Profile, agent=pk)
#         return profile

class UserEmailViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EmailInProfile
    search_fields = ('email',)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            user = self.request.user
            print('USER: ', type(user))
            return GetEmailUserSerializer
        return PostEmailUserSerializer
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            print('SERIALIZER')
            return GetProfilesSerializer
        return PostProfilesSerializer
    
    @action(
        detail=True,
        url_path='user-profile',
        methods=('GET',)
    )
    def get_user_profile(self, request, id):
        user = request.user
        profile = get_object_or_404(Profile, agent=id)
        response = HttpResponse(profile)
        print('GET_USER')
        context = {
            response: response,
            user: user
        }
        return context
    

class CountUnlookedOrdersViewset(viewsets.ModelViewSet):
    queryset = Order.objects.filter(is_looked=False)
    serializer_class = CountUnlookedOrdersSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        return super().update(request, *args, **kwargs)

    @action(
            detail=False,
            url_path='looked',
            methods=('PATCH',)
    )
    def looked(self, request, pk):
        instanse = self.queryset.filter(id=pk)
        print('LOOKED: ', instanse, request)
        # serializer = self.serializer_class(instanse, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        return Response(status=status.HTTP_200_OK)
    

class UpdateLookedOrdersViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = CountUnlookedOrdersSerializer

    @action(
            detail=False,
            url_path='looked',
            methods=('PATCH',)
    )
    def get_looked(self, request, *args, **kwargs):
        instanse = self.queryset.filter(is_looked=False)
        print(instanse, request.data)
        serializer = self.serializer_class(instanse, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class BankStatisticViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.filter(status='завершено').order_by('-date_update')
    serializer_class = BankStatisticSerializer
    pagination_class = None
    filter_backends = (DjangoFilterBackend,)
    filterset_class = StatisticDateFilter

    # def get_queryset(self, after=None, before=None):
    #     queryset = self.queryset.filter(date_update__range=(after, before), )
    #     return queryset


class PriceByBankViewSet(viewsets.ModelViewSet):
    queryset = PriceByBank.objects.all()
    serializer_class = PriceByBankSerializer
    pagination_class = None


class QuestionsViewset(viewsets.ModelViewSet):
    queryset = Questions.objects.all()
    serializer_class = QuestionsSerializer
    pagination_class = None


class TestsScoreViewset(viewsets.ModelViewSet):
    queryset = TestsScore.objects.all()
    # serializer_class = TestsScoreSerializer
    pagination_class = None

    def get_serializer_class(self):
        if self.request.method in ('POST', 'PUT', 'PATCH'):
            return TestsScoreCreateSerializer
        return TestsScoreSerializer
    

class TestsScoreUserVSGroupViewset(viewsets.ModelViewSet):
    serializer_class = TestsScoreSerializer
    pagination_class = None

    def get_queryset(self):
        print(self.request.user.id)
        queryset = TestsScore.objects.get(group_id__user=self.request.user.id)
        return queryset
    


class QuestGroupViewset(viewsets.ModelViewSet):
    queryset = QuestGroup.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestGroupSerializer
    pagination_class = None


class QuestInGroupViewset(viewsets.ModelViewSet):
    queryset = QuestGroup.objects.all()
    serializer_class = QuestInGroupSerializer
    pagination_class = None


class UserQuestAnsweredViewset(viewsets.ModelViewSet):
    queryset = UserQuestAnswered.objects.all()
    serializer_class = UserQuestAnsweredSerializer
    pagination_class = None

    def get_queryset(self):
        user = User.objects.get(id=self.request.user.id)
        print(user)
        if(self.request.method == 'GET'):
            queryset = user.user_quest_answered.all()
            return queryset
        return super().get_queryset()


class UQAInGroupViewset(viewsets.ModelViewSet):
    serializer_class = UserQuestAnsweredSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = UQAInGroup
    pagination_class = None

    def get_queryset(self):
        user = User.objects.get(id=self.request.user.id)
        if(self.request.method == 'GET'):
            queryset = user.user_quest_answered.all()
            return queryset
        return super().get_queryset()
    

class StatisticViewset(viewsets.ModelViewSet):
    serializer_class = UQAWithGroupSerializer
    pagination_class = None

    def get_queryset(self):
        user = User.objects.get(id=self.request.user.id)
        if(self.request.method == 'GET'):
            queryset = user.user_quest_answered.all()
            return queryset
        return super().get_queryset()


    

