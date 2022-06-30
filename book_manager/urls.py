from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(prefix='book', viewset=views.BookViewSet)
router.register(prefix='category', viewset=views.CategoryViewSet)
router.register(prefix='users', viewset=views.UserViewSet)
urlpatterns = [
    # path('hello', views.hello),
    # path('welcome', views.welcome),
    path('', include(router.urls)),
]
