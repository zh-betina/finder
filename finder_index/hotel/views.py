from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from core.authentication import AmorAPI, ByzanceAPI, CaraibesAPI
import requests
import json

@csrf_exempt
def hotels(request):
    if request.method == 'GET':

        ## Amor API
        tokenA = AmorAPI()
        headersRoomsA = {'Authorization': tokenA}
        amorRooms = requests.get('http://localhost:8005/api/chambres', headers=headersRoomsA)
        resAmor = json.loads(amorRooms.text)
        for room in resAmor:
            room["hotel"] = 1

        ## Byzance API
        tokenB = ByzanceAPI()
        headersRoomsB = {'Authorization': tokenB}
        byzanceRooms = requests.get('http://localhost:8004/api/chambres', headers=headersRoomsB)
        resByzance = json.loads(byzanceRooms.text)
        for room in resByzance:
            room["hotel"] = 2

        ## Caraibes API
        tokenC = CaraibesAPI()
        headersWithToken = {'x-access-token': tokenC, 'Content-type': 'application/json'}
        caraibesRooms = requests.get('http://localhost:5000/chambres', headers=headersWithToken)
        resCaraibes = json.loads(caraibesRooms.text)
        for room in resCaraibes:
            room["hotel"] = 3
        
        ## Response
        response = resAmor + resByzance + resCaraibes
        jsonString = json.dumps(response)
        return JsonResponse(response, safe=False)

