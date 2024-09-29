from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
from django.db import models


# class MyUserManager(BaseUserManager):

#     def create_superuser(self, email, username, first_name, last_name, password=None):
#         """
#         Creates and saves a User with the given email, date of
#         birth and password.
#         """

#         print('CREATE SUPERUSER: ', self)
#         if not email:
#             raise ValueError('Users must have an email address')

#         user = self.model(email=self.normalize_email(email),
#                           username=username, first_name=first_name, last_name=last_name)

#         user.is_superuser = True
#         user.is_staff = True
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

    # def create_superuser(self, email, username, first_name, last_name, password):
    #     """
    #     Creates and saves a superuser with the given email, date of
    #     birth and password.
    #     """
    #     user = self.create_user(email,
    #         username=username,
    #         first_name=first_name,
    #         last_name=last_name,
    #         password=password
    #     )
    #     user.is_superuser = True
    #     user.save(using=self._db)
    #     return user


class User(AbstractUser):

    # objects = MyUserManager()

    email = models.EmailField(
        max_length=254, unique=True, verbose_name='Адрес электронной почты'
    )
    username = models.CharField(
        max_length=150, unique=True, verbose_name='Уникальный юзернейм'
    )
    first_name = models.CharField(
        max_length=150, verbose_name='Имя'
    )
    last_name = models.CharField(
        max_length=150, verbose_name='Фамилия'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def save(self, *args, **kwargs):
        """Хэширует пароль и сохраняет его в базе данных"""
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-id']
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username


class Follow(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Пользователь',
        related_name='follower',
        on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        User,
        verbose_name='Подписки',
        related_name='following',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'
        constraints = (
            models.UniqueConstraint(
                fields=['user', 'author'],
                name='unique follow'
            ),
        )

    def __str__(self):
        return f'{self.user} - {self.author}'
    
