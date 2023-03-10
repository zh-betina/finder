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


        authData2 = {
            "email": "zorg@sio.fr",
            "password": "zorgoTest"
        }
        headers2 = {'Content-type': 'application/json'}
        url2 = "http://localhost:8004/auth"
        byzanceAuth = requests.post(url2, json=authData2, headers=headers2)
        resByzance= json.loads(byzanceAuth.text)
        token2 = "Bearer " + resByzance["token"]
        ## TOKEN AUTH ##

        headersRooms = {'Authorization': token}
        amorRooms = requests.get('http://localhost:8005/api/chambres', headers=headersRooms)
        resAmor = json.loads(amorRooms.text)
        for room in resAmor:
            room["hotel"] = 1

        headersRooms2 = {'Authorization': token2}
        byzanceRooms = requests.get('http://localhost:8004/api/chambres', headers=headersRooms2)
        resByzance = json.loads(byzanceRooms.text)
        for room in resByzance:
            room["hotel"] = 2

        authData3 = {
            "email": "zorg@sio.fr",
            "password": "test"
        }
        headers3 = {'Content-type': 'application/json'}
        url3 = "http://localhost:5000/auth"
        caraibesAuth = requests.post(url3, json=authData3, headers=headers3)
        resCaraibes = json.loads(caraibesAuth.text)

        headersWithToken = {'x-access-token': resCaraibes["token"], 'Content-type': 'application/json'}
        
        caraibesRooms = requests.get('http://localhost:5000/chambres', headers=headersWithToken)
        resCaraibes = json.loads(caraibesRooms.text)
        for room in resCaraibes:
            room["hotel"] = 3
        
        response = resAmor + resByzance + resCaraibes
        jsonString = json.dumps(response)
        return JsonResponse(response, safe=False)

