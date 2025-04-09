from django.contrib import admin
from .models import CustomUser
from django.contrib.admin import ModelAdmin

# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):

    def has_delete_permission(self, request, obj = ...):
        return True




admin.site.register(CustomUser, CustomUserAdmin)
