# Generated by Django 3.1.4 on 2021-04-24 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0007_auto_20210424_2036'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutomatedOrdering',
            fields=[
                ('id', models.AutoField(
                    auto_created=True,
                    primary_key=True,
                    serialize=False,
                    verbose_name='ID'
                    )
                 ),
                ('enable', models.BooleanField()),
            ],
        ),
    ]