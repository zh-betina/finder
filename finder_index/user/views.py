from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from core.authentication import create_access_token, create_refresh_token
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
def accountCreate(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        emailVal = body.get("email")
        passwordVal = body.get("password")
        bdayVal = body.get("bday")
        user = User(email=emailVal, password=passwordVal, bday=bdayVal)
        user.set_password(passwordVal)
        response = {}
        try:
            user.save()
            response = {"code": 201, "status": "Created"}
        except:
            response = {"code": 500, "status": "Fail"}

        return JsonResponse(response, safe=False)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        emailVal = body.get("email")
        passwordVal = body.get("password")
        user = User.objects.filter(email=emailVal).first()
        response = JsonResponse({"code": 500, "status": "Fail"}, safe=False)

        if user and user.check_password(passwordVal):
            access_token = create_access_token(user.id)
            refresh_token = create_refresh_token(user.id)
            response = JsonResponse({"code": 201, "status": "Token created", "token": access_token}, safe=False)
            response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
            
        return response