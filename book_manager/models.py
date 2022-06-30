from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='uploads/%Y/%m')


class Category(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self) -> str:
        return self.name


class Book(models.Model):

    def __str__(self) -> str:
        return self.name
    # in form
    name = models.CharField(max_length=225, null=False)
    author = models.CharField(max_length=255, null=False)
    nhaxuatban = models.CharField(max_length=255, null=True)
    namxuatban = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    #
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
