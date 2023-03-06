from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def hotels(request):
    if request.method == 'GET':
        amorRooms = requests.get('http://localhost:8001/chambres')
        resAmor = json.loads(amorRooms.text)
        for room in resAmor:
            room["hotel"] = 1

        byzanceRooms = requests.get('http://localhost:8004/chambres')
        resByzance = json.loads(byzanceRooms.text)
        for room in resByzance:
            room["hotel"] = 2

        caraibesRooms = requests.get('http://localhost:5000/chambres')
        resCaraibes = json.loads(caraibesRooms.text)
        for room in resCaraibes:
            room["hotel"] = 3
        
        response = resAmor + resByzance + resCaraibes
        jsonString = json.dumps(response)
        return JsonResponse(response, safe=False)

