from django.db import models

class Hotel(models.Model):
    name = models.CharField("name", max_length=240)

    def __str__(self):
        return self.name