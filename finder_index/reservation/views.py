from django.shortcuts import render
from django.http import JsonResponse
from core.authentication import token_required
from django.views.decorators.csrf import csrf_exempt
from core.authentication import AmorAPI, ByzanceAPI, CaraibesAPI
import requests
import json

@csrf_exempt
def availableRooms(request):
    if request.method == "GET":
        start_date = request.GET.get('start', None)
        end_date = request.GET.get('end', None)
        people_nb = request.GET.get('nb', None)

        ## Amor API
        tokenA = AmorAPI()
        headersRoomsA = {'Authorization': tokenA}
        amorRooms = requests.get(f'http://localhost:8005/api/available-rooms?start={start_date}&end={end_date}&nb={people_nb}', headers=headersRoomsA)
        resAmor = json.loads(amorRooms.text)
        for room in resAmor:
            room["hotel"] = 1

        
        ## Response
        response = resAmor
        json.dumps(response)
        return JsonResponse(response, safe=False)