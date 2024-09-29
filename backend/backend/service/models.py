from django.db import models
from django.core.validators import EmailValidator

from users.models import User
from core.validators import check_inn, isValidEmail


BANKS = (
    ('Тинькофф', 'Тинькофф'),
    ('ГПБ', 'ГПБ'),
    ('Сбер', 'Сбер'),
    ('Альфабанк', 'Альфабанк')
)

STATUSES = (
    ('в работе', 'в работе'),
    ('обрабатывается банком', 'обрабатывается банком'),
    ('дубль', 'дубль'),
    ('завершено', 'завершено')
    # ('sending_to_bank', 'отправка в банк'),
    # ('deny', 'отказано'),
    # ('success', 'подтверждено банком')
)


class Application(models.Model):
    """Заявка агента."""
    
    agent = models.ForeignKey(
        User,
        verbose_name='Агент',
        related_name='application',
        on_delete=models.CASCADE
    )
    image = models.FileField(
        'Файл',
        null=True,
        blank=True,
        upload_to='media/docs'
    )
    comments = models.TextField('Комментарии', blank=True)
    is_checked = models.BooleanField(default=False)
    is_paied = models.BooleanField(default=False)
    pub_date = models.DateTimeField(
        'Дата публикации',
        auto_now=True,
        db_index=True)

    class Meta:
        ordering = ('-pub_date',)
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'


class Order(models.Model):
    """Полная заявка агента."""
    
    agent = models.ForeignKey(
        User,
        verbose_name='Агент',
        related_name='agent',
        on_delete=models.CASCADE
    )
    name = models.CharField('Имя')
    surname = models.CharField('Фамилия')
    father_name = models.CharField('Отчество', blank=True)
    inn = models.CharField('ИНН', max_length=12, validators=[check_inn])
    organization = models.CharField('Организация')
    city = models.CharField('Город')
    email = models.CharField('Email', validators=[isValidEmail])
    phone = models.CharField('Телефон', max_length=10, default='0000000000')
    bank = models.CharField('Банк', choices=BANKS)
    comments = models.TextField('Комментарии', blank=True)
    status = models.CharField(choices=STATUSES, default='в работе')
    is_need_visit_service = models.BooleanField('Нужен выездной сервис')
    is_paied = models.BooleanField(default=False)
    is_looked = models.BooleanField(default=False)
    pub_date = models.DateField(
        'Дата создания',
        auto_now_add=True,
        db_index=True)
    date_update = models.DateField(
        'Дата последнего изменения',
        auto_now=True,
    )

    class Meta:
        ordering = ('-pub_date',)
        verbose_name = 'Полная заявка'
        verbose_name_plural = 'Полные заявки'


class Profile(models.Model):

    '''Профиль агента'''
    agent = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    inn = models.CharField('ИНН', max_length=12, unique=True, validators=[check_inn])
    ogrn = models.CharField('ОГРН(ОГРИП)',
                            unique=True,
                            max_length=12,
                            blank=True,
                            validators=[check_inn])
    pub_date = models.DateTimeField(
        'Дата создания',
        auto_now=True,
        db_index=True)
    
    class Meta:
        ordering = ('-pub_date',)
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class PriceByBank(models.Model):
    bank = models.CharField('Банк', choices=BANKS)
    price5 = models.IntegerField('Вознаграждение до 5', default=1000)
    price10 = models.IntegerField('Вознаграждение до 10', default=1000)
    price_largest = models.IntegerField('Вознаграждение свыше 10', default=1000)

    class Meta:
        verbose_name_plural = 'Вознаграждение банка'


class QuestGroup(models.Model):
    group = models.CharField('Группа', max_length=150, unique=True)

    class Meta:
        verbose_name_plural = 'Группы вопросов'

    def __str__(self):
        return self.group
    

class Quest(models.Model):
    question = models.CharField('Вопрос',)
    group = models.ForeignKey(
        QuestGroup, 
        blank=False,
        related_name='question', 
        on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Вопросики'


class Questions(models.Model):
    question = models.CharField('Вопрос',)
    right_answer = models.CharField('Правильный ответ',)
    wrong_answer1 = models.CharField('Ошибка1',)
    wrong_answer2 = models.CharField('Ошибка2',)
    wrong_answer3 = models.CharField('Ошибка3',)
    group = models.ForeignKey(
        QuestGroup, 
        blank=False,
        related_name='questions', 
        on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Вопросы'


class TestsScore(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Пользователь',
        related_name='score',
        on_delete=models.CASCADE
    )
    group = models.ForeignKey(
            QuestGroup, 
            verbose_name='Группа',
            related_name='score', 
            on_delete=models.CASCADE)
    qty_right_answer = models.IntegerField('Кол-во правильных ответов')

    class Meta:
        verbose_name_plural = 'Количество правильных ответов'
        constraints = [
        models.UniqueConstraint(fields=['user', 'group'], name='unique_user_group')
    ]
        

class UserQuestAnswered(models.Model):
     user = models.ForeignKey(
        User,
        verbose_name='Пользователь',
        related_name='user_quest_answered',
        on_delete=models.CASCADE
    )
     quest = models.ForeignKey(
         Questions,
         verbose_name='Пройденный вопрос',
         related_name='quest',
         on_delete=models.CASCADE
         )
     is_how_answered = models.BooleanField('How answered', default=False)

     class Meta:
        verbose_name_plural = 'Пройденные вопросы'
        constraints = [
        models.UniqueConstraint(fields=['user', 'quest'], name='unique_user_quest')
    ]


# objs = Order.objects.all().values(
#     'pk',
#     'phone'
# )
# for obj in objs:
#     l = len(obj['phone'])
#     # print(obj['inn'])
#     if l > 10:
#         print(f'obj with id {obj["pk"]} has that field at {l} characters long')

