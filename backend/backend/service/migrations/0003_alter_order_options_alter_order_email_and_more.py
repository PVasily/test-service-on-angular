# Generated by Django 4.2.2 on 2023-08-01 18:32

import core.validators
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_profile_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ('-pub_date',), 'verbose_name': 'Полная заявка', 'verbose_name_plural': 'Полные заявки'},
        ),
        migrations.AlterField(
            model_name='order',
            name='email',
            field=models.CharField(unique=True, validators=[django.core.validators.EmailValidator], verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='order',
            name='inn',
            field=models.CharField(max_length=12, unique=True, validators=[core.validators.check_inn], verbose_name='ИНН'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('in_work', 'в работе'), ('in_process', 'обрабатывается банком'), ('duble', 'дубль'), ('sending_to_bank', 'отправка в банк'), ('deny', 'отказано'), ('success', 'подтверждено банком')]),
        ),
    ]
