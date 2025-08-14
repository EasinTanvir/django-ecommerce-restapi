
from . import views
from django.urls import path

urlpatterns = [ 
  
    path('user', views.GetUserInfo.as_view(), name="all-users"),
    path('user/login', views.LogInUser.as_view(), name="login-users"),
    path('user/register', views.RegisterUser.as_view(), name="register-users"),
    
   
    

]
