from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def users(request):
    if request.method == 'GET':
        serializer_class = UserSerializer
        queryset = User.objects.all()
        qs_json = serializers.serialize('json', queryset)
        return JsonResponse({"users": "hello"}, safe=False)
    elif request.method == 'POST':
        return JsonResponse({"res": "POSTTT"}, safe=False)

@csrf_exempt
def account(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        emailVal = body.get("email")
        passwordVal = body.get("password")
        bdayVal = body.get("bday")
        user = User(email=emailVal, password=passwordVal, bday=bdayVal)
        response = {}

        try:
            user.save()
            response = {"code": 201, "status": "created"}
        except:
            response = {"code": 500, "status": "Fail"}

        return JsonResponse(response, safe=False)
