from django.db import models
from django.contrib.auth.models import User


# User Profile Model

class UserProfile(models.Model) :
    ROLE_CHOICES = [
        ("U", "USER"),
        ("A", "ADMIN"),
    ]
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)    
    age = models.IntegerField(blank=True,null=True)  
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default="U")  

  