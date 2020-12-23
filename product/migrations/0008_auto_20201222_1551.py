# Generated by Django 3.1.4 on 2020-12-22 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_auto_20201222_1538'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='food_allergen_labels',
        ),
        migrations.AddField(
            model_name='product',
            name='food_allergen_labels',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.DO_NOTHING, to='product.foodallergenlabels'),
            preserve_default=False,
        ),
    ]