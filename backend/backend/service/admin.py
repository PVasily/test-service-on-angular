from django.contrib import admin

from .models import (Application, Order, PriceByBank, 
Profile, Quest, QuestGroup, Questions, TestsScore, UserQuestAnswered, 
# Questions, TestsScore
)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('pk', 'agent', 'image', 'pub_date')
    list_filter = ('agent', 'pub_date' )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('pk', 'agent', 'name', 'surname', 'father_name',
                    'inn', 'organization', 'city', 'email', 'phone',
                    'bank', 'comments', 'status', 'is_need_visit_service',
                    'pub_date', 'date_update', 'is_looked')
    list_filter = ('bank', 'agent', 'status', 'date_update')
    ordering = ('id',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'agent', 'inn', 'ogrn', 'pub_date')


@admin.register(PriceByBank)
class PriceByBankAdmin(admin.ModelAdmin):
    list_display = ('bank', 'price5', 'price10', 'price_largest')


@admin.register(Questions)
class QuestionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'group', 'question', 'right_answer', 'wrong_answer1', 'wrong_answer2', 'wrong_answer3')


@admin.register(TestsScore)
class TestsScoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'group', 'qty_right_answer')


@admin.register(Quest)
class QuestAdmin(admin.ModelAdmin):
    list_display = ('question', 'group')


@admin.register(QuestGroup)
class QuestGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'group', )


@admin.register(UserQuestAnswered)
class UserQuestAnsweredAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'quest', 'is_how_answered')
    
