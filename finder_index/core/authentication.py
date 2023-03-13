import jwt, datetime, requests, json
from functools import wraps
from user.models import User
from django.http import JsonResponse, HttpResponse

## Authentication functions to manage communication with the front-end part

def create_access_token(id):
    return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        'iat': datetime.datetime.utcnow()
    }, 'secretKeyWordsToChangeLater', algorithm='HS256')

def create_refresh_token(id):
        return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }, 'RefreshsecretKeyWordsToChangeLater', algorithm='HS256')

def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'secretKeyWordsToChangeLater', algorithms='HS256')
        return payload['user_id']
    except:
         raise Exception
    
def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'RefreshsecretKeyWordsToChangeLater', algorithms='HS256')
        return payload['user_id']
    except:
         raise Exception
    
## Decorator to execute before protected routes :
def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        request = args[0]
        token = request.headers.get('token')
        if token:
            token = token.split()
            if token and len(token) == 2:
                token = token[1]
                id = decode_access_token(token)
                ## TODO : verify if the user is ok
                user = User.objects.filter(pk=id).first()
                pass
            else:
                return JsonResponse({"message": "nok"}, status=401)
        else:
            return JsonResponse({"message": "nok"}, status=401)
        return function(*args, **kwargs)
    return decorated      
    

## Classes for getting tokens from the API servers - singletones

class AmorAPI():
    def __init__(self):
            authData = {
                "email": "zorg@sio.fr",
                "password": "zorg"
            }
            url = "http://localhost:8005/auth"
            try:
                auth = requests.post(url, json=authData, headers={'Content-type': 'application/json'})
                res = json.loads(auth.text)
                self.token = "Bearer " + res["token"]
            except Exception:
                self.token = None
                print("\n Error occured while getting a token from Amor API")

    def __call__(self):
         return self.token

AmorAPI = AmorAPI()

class ByzanceAPI():
    def __init__(self):
        authData = {
            "email": "zorg@sio.fr",
            "password": "zorgoTest"
        }
        headers = {'Content-type': 'application/json'}
        url = "http://localhost:8004/auth"
        try:
            auth = requests.post(url, json=authData, headers={'Content-type': 'application/json'})
            res = json.loads(auth.text)
            self.token = "Bearer " + res["token"]
        except Exception:
             self.token = None
             print("\n Error occured while getting a token from Byzance API")
    def __call__(self):
        return self.token

ByzanceAPI = ByzanceAPI()

class CaraibesAPI():
    def __init__(self):
        authData = {
            "email": "zorg@sio.fr",
            "password": "test"
        }
        url = "http://localhost:5000/auth"
        try:
            auth = requests.post(url, json=authData, headers={'Content-type': 'application/json'})
            res = json.loads(auth.text)
            self.token = res["token"]
        except Exception:
             self.token = None
             print("\n Error occured while getting a token from Caraibes API")
    def __call__(self):
        return self.token

CaraibesAPI = CaraibesAPI()