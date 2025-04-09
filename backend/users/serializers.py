from rest_framework import serializers
from .models import CustomUser
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'phone_number',  'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if CustomUser.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({'email': 'This email is already registered.'})
        
        if CustomUser.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError({'username': 'This username is already taken'})
        
        
        if len(data.get('password', '')) < 8:
            raise serializers.ValidationError({'password': 'Password must be at least 8 characters long'})
        
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        

        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )
    
        
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=10, required= True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        phone_number = data.get('phone_number')
        password = data.get('password')

        user = authenticate(
            request=self.context.get('request'),
            phone_number = phone_number,
            password=password
        )

        if not user:
            raise serializers.ValidationError("Invalid phone number or password.")

        refresh = RefreshToken.for_user(user)
        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'phone_number': user.phone_number,
                'email': user.email,
                'is_superuser': user.is_superuser,
                'is_staff' : user.is_staff
            },
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
        }
    

class DeleteUserSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)


    def validate(self, data):
        password = data.get('password')

        user = self.context.get('user')
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid Password: ")
        
        return data
    

