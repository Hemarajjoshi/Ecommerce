from rest_framework import serializers
from .models import Order, Cart , CartItem
from products.models import Product


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source= 'product.name', read_only=True)
    product_price = serializers.DecimalField(source= 'product.price', read_only= True)

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'product_name', 'product_price']




class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many= True, read_only=True)
    total_items = serializers.IntegerField(source = 'total_items', read_only = True)
    total_price = serializers.DecimalField(source= 'total_price', read_only= True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at', 'items', 'total_items', 'total_price']



class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only = True)
    user = serializers.StringRelatedField(read_only = True)


    class Meta: 
        model = Order
        fields =  ['user', 'cart', 'total_amount', 'status', 'created_at', 'updated_at', 'payment_proof']


