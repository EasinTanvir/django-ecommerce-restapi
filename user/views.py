from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class GetUserInfo(APIView) :
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        user = request.user
        user = UserSerializer(user)
        return Response({"user":user.data},status=status.HTTP_200_OK)
        

class LogInUser(APIView):
    def post(self, request):        
        data = request.data
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return Response({"message": "Email and password are required."}, status=400)  
        
        try :            
            user = User.objects.get(email= email)     
                  
        except User.DoesNotExist :
            return Response({"message": "Invalid email."}, status=401)
        
        if not check_password(password, user.password) :         
            return Response({"message": "Invalid Password."}, status=401)
        
        serializer = UserSerializer(user)
        # Generate token with custom claims
        refresh = RefreshToken.for_user(user)
        refresh['user_id'] = user.id       
     
        return Response({
            "message": "Login successful",
            "user": serializer.data,
            "access_token": str(refresh.access_token),
            "refresh": str(refresh)            
        }, status=200)              
        
        
        
     
class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully",
                "user": UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)