# Generated by Django 3.1.4 on 2021-04-25 13:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0020_auto_20210425_1315'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventoryingredient',
            name='email_sent',
        ),
    ]