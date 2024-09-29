from django.forms import ValidationError
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from users.serializers import AnonymousUserSerializer, UserSerializer

from .models import Application, Order, PriceByBank, Profile, QuestGroup, Questions, TestsScore, User, BANKS, STATUSES, UserQuestAnswered


class AppCreateSerializer(serializers.ModelSerializer):

    image = Base64ImageField()

    class Meta:
        model = Application
        fields = ('image',)


class AppGetSerializer(serializers.ModelSerializer):

    image = Base64ImageField()
    agent = UserSerializer()

    class Meta:
        model = Application
        fields = ('image', 'agent')


class AppGetAnonimousSerializer(serializers.ModelSerializer):

    image = Base64ImageField()
    agent = AnonymousUserSerializer()

    class Meta:
        model = Application
        fields = ('image', 'agent')


class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)


class OrderCreateSerializer(serializers.ModelSerializer):
    
    # bank = serializers.CharField(source='get_bank_display')
    bank = ChoiceField(choices=BANKS)

    class Meta:
        model = Order
        exclude = ('pub_date', 'status', 'is_paied')


class OrderUpdateSerializer(serializers.ModelSerializer):
    
    status = ChoiceField(choices=STATUSES)

    class Meta:
        model = Order
        fields = ('status', )


class GetOrderSerializer(serializers.ModelSerializer):

    agent_email = serializers.SerializerMethodField()
    agent_last_name = serializers.SerializerMethodField()


    class Meta:
        model = Order
        fields = ('id', 'agent_email', 'agent_last_name', 'organization',
                  'inn', 'bank', 'city', 'phone', 'pub_date', 'status')
        order_by = ('id',)

    def get_agent_email(self, obj):
        return obj.email
    
    def get_agent_last_name(self, obj):
        return obj.surname
    

class GetProfilesSerializer(serializers.ModelSerializer):

    agent = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        model = Profile
        fields = ('agent', 'inn', 'ogrn', 'pub_date')


class PostProfilesSerializer(serializers.ModelSerializer):

    agent = UserSerializer(read_only=True)

    def create(self, validated_data):
        user_id = self.context['request'].user
        print('POSTPROFILE', user_id)
        profile = Profile.objects.create(**validated_data, agent=user_id)
        return profile

    class Meta:
        model = Profile
        fields = ('agent', 'inn', 'ogrn')
    

class GetEmailUserSerializer(serializers.ModelSerializer):
    
    profile = GetProfilesSerializer()

    class Meta:
        model = User
        fields = ('id', 'last_login', 'date_joined', 'email',
                 'username', 'first_name', 'last_name', 'profile')
        

class PostEmailUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'password')


class CountUnlookedOrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id', 'is_looked',)


class BankStatisticSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('bank', 'date_update')


class PriceByBankSerializer(serializers.ModelSerializer):

    class Meta:
        model = PriceByBank
        fields = ('bank', 'price5', 'price10', 'price_largest',)


class QuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Questions
        fields = ('id', 'question', 'right_answer', 'wrong_answer1', 'wrong_answer2', 'wrong_answer3')


class QuestGroupSerializer(serializers.ModelSerializer):

    # questions = QuestionsSerializer(many=True, read_only=True)

    class Meta:
        model = QuestGroup
        fields = ('id', 'group',)


class QuestInGroupSerializer(serializers.ModelSerializer):

    questions = QuestionsSerializer(many=True, read_only=True)

    class Meta:
        model = QuestGroup
        fields = ('id', 'group', 'questions')


class TestsScoreSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = TestsScore
        fields = ('id', 'user', 'group', 'qty_right_answer')


class TestsScoreCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestsScore
        fields = ('user', 'group', 'qty_right_answer')


class UserQuestAnsweredSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserQuestAnswered
        fields = '__all__'


class GetUQASerializer(serializers.ModelSerializer):

    class Meta:
        model = UserQuestAnswered
        exclude = ('user',)


class GetUserQuestAnsweredSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    quests = GetUQASerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('user', 'quests')
     

class UQAWithGroupSerializer(serializers.ModelSerializer):

    group = QuestGroupSerializer(source='quest')

    class Meta:
        model = UserQuestAnswered
        fields = ('id', 'user', 'quest', 'is_how_answered', 'group')