from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def users(request):
    if request.method == 'GET':
        serializer_class = UserSerializer
        queryset = User.objects.all()
        qs_json = serializers.serialize('json', queryset)
        return JsonResponse({"users": "hello"}, safe=False)
    elif request.method == 'POST':
        return JsonResponse({"res": "POSTTT"}, safe=False)

