import os.path
import json

from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify, request, make_response
import sqlalchemy
from sqlalchemy import text
import jwt
import config
from datetime import datetime, timedelta
from functools import wraps

## initialisation Flask & cors
app = Flask(__name__)
CORS(app)

## DB connection
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:admin@172.20.0.2/hotelC'
engine = sqlalchemy.create_engine(SQLALCHEMY_DATABASE_URI, echo=True)


## refactor those
@app.route("/")
def serveEntryFile():
  path = "index.html"
  return app.send_static_file(path)

@app.route("/connection")
def serveConnectionFile():
  path = "connection.html"
  return app.send_static_file(path)

@app.route("/inscription")
def serveInscriptionFile():
  path = "inscription.html"
  return app.send_static_file(path)

## ---------------- VERIFY TOKEN  -------------------- ##
@app.route("/auth", methods=['POST'])
def authenticate():
  response = {
    "success" : False,
    "message" : "Invalid parameters",
    "token" : ""
  }

  resBody = request.json
  email = resBody["email"]
  password = resBody["password"]

  sql = (f"SELECT * "
    f"FROM user "
    f"WHERE email='{email}' AND password='{password}';")

  if (not email and not password) or (not email or not password):
    response["message"] = "Missing parameters"
  
  if (email and password):
    sql = (f"SELECT * "
       f"FROM user "
       f"WHERE email='{email}' AND password='{password}';")

    with engine.connect() as connection:
      result = connection.execute(text(sql))
      for row in result:
        if row[2] == password:
          token = jwt.encode({
            'email': row[1],
            'exp': datetime.utcnow() + timedelta(hours=24)
          }, config.SECRET_KEY)

          response["message"] = "Token"
          response["token"] = token
          response["success"] = True
      
  return make_response(jsonify(response), 200)


def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return 'Unauthorized Access!', 401

        try:
          data = jwt.decode(token, config.SECRET_KEY, 'HS256')
        except:
          return 'nok!', 401
        email = data["email"]
        sql = (f"SELECT * "
          f"FROM user "
          f"WHERE email='{email}';")
        with engine.connect() as connection:
          result = connection.execute(text(sql))
          for row in result:
            current_user = row[1]
            if not current_user:
              return 'nok!', 401   
        return function(*args, **kwargs)
    return decorated      
## ---------------- VERIFY TOKEN  -------------------- ##

@app.route("/chambre/<id>", methods=['POST'])
def findRoom(id):
  with engine.connect() as connection:
    result = connection.execute('''SELECT * FROM chambre WHERE id=%s''', id)
    response = {}
    for row in result:
      response = {
        "roomDescr": [{
          "id": row["id"],
          "nbCouchage": row["nbCouchage"],
          "porte": row["porte"],
          "etage": row["etage"],    
          "idCategorie": row["idCategorie"],
          "baignoire": row["baignoire"],
          "prixBase": row["prixBase"]
        }]
      }
    
  return make_response(jsonify(response), 200)

#CORRECT : only last room is added, because it's overring
@app.route("/chambres", methods=['GET'])
@token_required
def getRooms():
   with engine.connect() as connection:
    result = connection.execute(text('SELECT * FROM chambre'))
    response = []
    for row in result:
      row_as_dict = row._mapping
      response.append({
        "id": row_as_dict["id"],
          "nbCouchage": row_as_dict["nbCouchage"],
          "porte": row_as_dict["porte"],
          "etage": row_as_dict["etage"],
          "idCategorie": row_as_dict["idCategorie"],
          "baignoire": row_as_dict["baignoire"],
          "prixBase": row_as_dict["prixBase"]
      })
    return make_response(jsonify(response), 200)

# correct
@app.route("/user", methods=['GET'])
def checkUser():
  email = request.values.get('email')
  pwd = request.values.get('pwd')
  status = 401

  with engine.connect() as connection:
    sql = (f"SELECT * "
       f"FROM user "
       f"WHERE email='{email}' AND mdp='{pwd}';")

    result = connection.execute(sql)
    out = result.fetchall()
    data = 0
    for row in out:
      data = data+1
    
    if (data != 0):
      status = 200

  return make_response(jsonify({"msg": "ok"}), status)

@app.route("/user/<id>", methods=["DELETE"])
def deleteUser(id):
  with engine.connect() as connection:
    result = connection.execute('''DELETE FROM user WHERE id=%s''', id)
  return make_response({"msg": "ok"}, 200)
  

@app.route("/user?id=<id>&email=<email>", methods=["PUT"])
def modifyUser(id, email):
  with engine.connect() as connection:
    sql = (f"UPDATE user "
       f"SET email='{email}'"
       f"WHERE id={id};")
    result = connection.execute(sql)
    print(result)
  return make_response(jsonify(result), 200)

if __name__ == '__main__':
  app.run(debug=True)
