from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, OrderViewSet, ReviewViewSet, NewsletterViewSet,
    register, login, logout, get_profile, update_profile, change_password
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'newsletter', NewsletterViewSet, basename='newsletter')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('auth/logout/', logout, name='logout'),
    path('auth/profile/', get_profile, name='get_profile'),
    path('auth/profile/update/', update_profile, name='update_profile'),
    path('auth/change-password/', change_password, name='change_password'),
]
