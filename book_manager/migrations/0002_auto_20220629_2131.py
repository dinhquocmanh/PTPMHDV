# Generated by Django 2.2.13 on 2022-06-29 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book_manager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='namxuatban',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='nhaxuatban',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='status',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
