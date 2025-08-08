from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

def login_with_cookie(response, user):
    refresh = RefreshToken.for_user(user)

    response.set_cookie(
        key='access_token',
        value=str(refresh.access_token),
        httponly=True,
        secure=False,
        samesite='Lax',
        max_age=60*60*24,
        path='/',
    )
    
    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        httponly=True,
        secure=False,
        samesite='Lax',
        max_age=60*60*24*7,
        path='/',
    )

    return response

class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)

        response = Response({'message':'User create Success!'}, status=status.HTTP_201_CREATED)

        return login_with_cookie(response, user)

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("POST login view called")
        username = request.data.get('username')
        password = request.data.get('password')

        print('Login attempt:', username, password)

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({'error':'Invaild credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        response = Response({'message':'Login Succes!'}, status=status.HTTP_200_OK)
        
        return login_with_cookie(response, user)

class UserLogoutView(APIView):
    def post(self, request):
        response = Response({'message':'Logout Succes!'})

        response.delete_cookie('access_token', path='/')
        response.delete_cookie('refresh_token', path='/')

        return response
    
class UserCurrentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
        })