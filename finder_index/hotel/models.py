from django.db import models

class Hotel(models.Model):
    name = models.CharField("name", max_length=240)

    def __str__(self):
        return self.name
    

class Hotels(models.Model):
    email = models.EmailField()
    password = models.CharField("password", max_length=50)
    bday = models.DateField("bday")

    def __str__(self):
        return self