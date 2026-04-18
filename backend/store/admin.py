from django.contrib import admin
from .models import Product, ProductVariant, Order, OrderItem, Review, NewsletterSubscription


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'gender', 'is_new', 'is_sale', 'stock']
    list_filter = ['category', 'gender', 'is_new', 'is_sale', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ['product', 'size', 'color', 'stock']
    list_filter = ['product', 'size', 'color']
    search_fields = ['product__name']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'customer_email', 'total', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['customer_email', 'customer_name']
    readonly_fields = ['id', 'created_at', 'updated_at']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'size', 'color', 'quantity', 'price']
    list_filter = ['order', 'product']
    search_fields = ['order__id', 'product__name']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'product', 'rating', 'is_verified', 'created_at']
    list_filter = ['rating', 'is_verified', 'created_at']
    search_fields = ['author_name', 'product__name']
    readonly_fields = ['created_at']


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']
