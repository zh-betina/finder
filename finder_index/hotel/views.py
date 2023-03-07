from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def hotels(request):
    if request.method == 'GET':

        ## TOKEN AUTH ##
        authData = {
            "email": "zorg@sio.fr",
            "password": "zorg"
        }
        headers = {'Content-type': 'application/json'}
        url = "http://localhost:8005/auth"
        amorAuth = requests.post(url, json=authData, headers=headers)
        resAmor = json.loads(amorAuth.text)
        token = "Bearer " + resAmor["token"]

        ## TOKEN AUTH ##

        headersRooms = {'Authorization': token}
        amorRooms = requests.get('http://localhost:8005/api/chambres', headers=headersRooms)
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

