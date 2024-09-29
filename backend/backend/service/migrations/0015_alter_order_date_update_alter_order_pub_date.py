# Generated by Django 4.2.2 on 2024-03-02 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0014_alter_pricebybank_options_remove_pricebybank_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_update',
            field=models.DateField(auto_now=True, verbose_name='Дата последнего изменения'),
        ),
        migrations.AlterField(
            model_name='order',
            name='pub_date',
            field=models.DateField(auto_now_add=True, db_index=True, verbose_name='Дата создания'),
        ),
    ]
