from django.shortcuts import render
from .models import Book, Category, User
from .serializers import BookSerializer, CategorySerializer, UserSerizlizer
from rest_framework import viewsets, permissions
# Create your views here.
# Create your views here.


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects
    serializer_class = CategorySerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.filter(active=True)
    serializer_class = BookSerializer

    # def get_permissions(self):
    #     if self.action == 'list':
    #         return [permissions.AllowAny()]

    #     return [permissions.IsAuthenticated()]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects
    serializer_class = UserSerizlizer
