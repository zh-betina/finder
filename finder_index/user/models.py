from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField("password", max_length=255)
    bday = models.DateField("bday")
    username = None
    is_superuser = None
    first_name = None
    last_name = None
    is_staff = None
    is_active = None
    last_login = None

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    def __str__(self):
        return self