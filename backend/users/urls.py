from django.urls import path
from .views import UserRegisterView, UserLoginView, DeleteUserView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('<int:pk>/delete/', DeleteUserView.as_view(), name ='delete' )
]
