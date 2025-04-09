from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import RegexValidator



class CustomUser(AbstractUser):


    id = models.AutoField(primary_key=True)
    
    phone_number = models.CharField(
        max_length=10, 
        unique=True,
        blank=False
    )
    created_at = models.DateTimeField(auto_now_add=True)

    groups = models.ManyToManyField(
        Group, 
        related_name='custom_users', 
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, 
        related_name='custom_users', 
        blank=True
    )
    
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.username} ({self.phone_number})"
    