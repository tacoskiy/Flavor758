from django.urls import path, include
from .views import UserSignupView, UserLoginView, UserLogoutView, UserCurrentView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('user/', UserCurrentView.as_view(), name='user')
]