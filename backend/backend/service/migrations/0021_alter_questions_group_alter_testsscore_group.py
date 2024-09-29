# Generated by Django 5.0.6 on 2024-06-28 19:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0020_questions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='service.questgroup'),
        ),
        migrations.AlterField(
            model_name='testsscore',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='score', to='service.questgroup'),
        ),
    ]
