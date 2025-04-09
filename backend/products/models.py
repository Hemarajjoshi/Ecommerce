from django.db import models
from users.models import CustomUser


class Product(models.Model):
    name = models.CharField(max_length= 100)
    description = models.TextField(max_length = 100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    stock_quantity = models.IntegerField(default = 0)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to = 'product_pics', default = 'default.jpg')



    def __str__(self):
        return self.name


    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo and hasattr(obj.photo, 'url'):
            return request.build_absolute_uri(obj.photo.url)
        return None




class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to = 'product_pics', default = 'default.jpg')
    is_feature = models.BooleanField(default = False)
    


    def __str__(self):
        return self.product.name
    


    def __str__(self):
        return self.name





