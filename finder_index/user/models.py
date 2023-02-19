from django.db import models

class User(models.Model):
    email = models.EmailField()
    password = models.CharField("password", max_length=50)
    bday = models.DateField("bday")

    def __str__(self):
        return self