from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from .models import Product, ProductImage
from .serializers import (
    ProductUpdateSerializer, 
    ProductListSerializer, 
    ProductCreateSerializer, 
    ProductDeleteSerializer,
    ProductDetailSerializer,
    ProductImageSerializer
)

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer  
    parser_classes = [MultiPartParser, FormParser]  

    def get_permissions(self):
        """Set permissions based on action"""
        if self.action in ['create', 'update', 'destroy']:
            return [IsAdminUser()]
        elif self.action == 'list':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        """Return different serializers for different actions"""
        if self.action == "create":
            return ProductCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return ProductUpdateSerializer
        elif self.action == "retrieve":
            return ProductDetailSerializer  
        elif self.action == "destroy":
            return ProductDeleteSerializer
        return ProductListSerializer

    def create(self, request, *args, **kwargs):
        """Create a product with multiple images"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            return Response(ProductDetailSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductImageViewSet(ModelViewSet):
    """ViewSet for handling product images separately"""
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    parser_classes = [MultiPartParser, FormParser]  

    def create(self, request, *args, **kwargs):
        """Upload additional images for a product"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
