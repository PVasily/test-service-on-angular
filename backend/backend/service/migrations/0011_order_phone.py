# Generated by Django 4.2.2 on 2023-10-27 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0010_order_is_looked'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='phone',
            field=models.CharField(default='00000000000', verbose_name='Телефон'),
        ),
    ]
