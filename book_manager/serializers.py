from rest_framework.serializers import ModelSerializer
from .models import Book, Category


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name', 'author', 'nhaxuatban', 'namxuatban', 'status',
                  'description', 'category', 'created_date']


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
