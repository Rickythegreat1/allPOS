# Generated by Django 3.1.4 on 2020-12-11 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timestamp', '0002_auto_20201211_2119'),
    ]

    operations = [
        migrations.AddField(
            model_name='timestapm',
            name='on_shift',
            field=models.BooleanField(default=False),
        ),
    ]