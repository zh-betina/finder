from django.db import models
from hotel.models import Hotel
from user.models import User

class Reservation(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room = models.IntegerField("room")
    createdAt = models.DateTimeField("createdAt", auto_now_add=True)

    def __str__(self):
        return self