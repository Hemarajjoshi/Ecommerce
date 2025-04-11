from django.db import models 
from products.models import Product
from users.models import CustomUser


ORDER_STATUS_CHOICES =[
    ('pending', 'Pending'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered'),
    ('cancelled', 'Cancelled')
]





class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name= 'carts' )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart {self.id} - {self.CustomUser.username}'
    

    def total_price(self):
        return sum([item.product.price *item.quantity for item in self.items.all() ])
    
    
    def total_items(self):
        return sum([item.quantity.unique() for item in self.items.all()])
    

    
    class Meta:
        ordering = ['-created_at']


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete= models.CASCADE, related_name='items')
    quantity = models.PositiveIntegerField(default =1)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)






class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='orders')
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null = True )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now_add=True)
    payment_proof = models.ImageField(upload_to = 'payment_proofs', default = 'default.jpg')


    def __str__(self):
        return f'Order #{self.id} - {self.CusotomUser.username}'
    
    class Meta:
        ordering = [-'created_at']



