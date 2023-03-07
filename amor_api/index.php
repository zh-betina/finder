<?php
require __DIR__ . "/vendor/autoload.php";
require './services/DB.php';
require './settings.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\Http\Response as Res;
use Slim\Views\PhpRenderer;
use Tuupola\Middleware\CorsMiddleware;
use \Tuupola\Middleware\JwtAuthentication;
use Fastroute\Dispatcher;
use \Firebase\JWT\JWT;

$app = new \Slim\App;

$app->add(
    new CorsMiddleware([
        "origin" => ["*"],
        "methods" => function($request) use ($app) {
            $container = $app->getContainer();
            $dispatch = $container["router"]->dispatch($request);
            if (Dispatcher::METHOD_NOT_ALLOWED === $dispatch[0]) {
                return $dispatch[1];
            }
        }
    ])
);

$app->add(new JwtAuthentication([
    "path" => "/api",
    "attribute" => "decoded_token_data",
    "secret" => "verySecretSecretThatNobodyWillKnow",
    "algorithm" => ["HS256"],
    "error" => function ($response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

$app->group('/api', function () use ($app)  {

   
});

$container = $app->getContainer();
$container['renderer'] = new PhpRenderer("./templates");

//------------------ AUTH ----------------------------------------//

$app->post('/auth', function(Request $request, Response $response) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $email = $data['email'];
    $pwd = $data['password'];

    $query = "SELECT * FROM user WHERE email='$email'";
    $dbConn = new DB();
    $dbConn->connect();
    $res = $dbConn->query($query);

    if(!$res[0]["email"]) {
        return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
    }

    if ($res[0]["password"] != $pwd) {
        return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
    }

    $settings = "verySecretSecretThatNobodyWillKnow"; // get settings array.
    
    $token = JWT::encode(['id' => $res['id'], 'email' => $res['email']], $settings, "HS256");

    return $this->response->withJson(['token' => $token]);
});



//------------------ GET routes ----------------------------------//

$app->get('/', function (Request $request, Response $response) {
    return $this->renderer->render($response, "/index.html", []);
});

$app->get('/connection', function(Request $request, Response $response) {
    return $this->renderer->render($response, "connection.html", []);
});

$app->get('/inscription', function(Request $request, Response $response) {
    return $this->renderer->render($response, "inscription.html", []);
});



// Modify the one below
$app->get('/add-client', function(Request $request, Response $response) {
    return $this->renderer->render($response, "addClient.html", []);
});

$app->get('/api/chambre/{id}', function (Request $request, Response $response) {
    $roomId = $request->getAttribute('id');
    
    if (intval($roomId) !== 0) {
        $query = "SELECT * FROM chambre WHERE id = $roomId";
        $dbConn = new DB();
        $dbConn->connect();
        $res = $dbConn->query($query);
        $resBody = array('roomDescr' => $res);
    } else {
        $resBody = array('message' => "Le id saisie n'est pas un nombre ou est égal à 0. Choisissez un autre id svp.");
    }

    $res = new Res();
    return $res->withJson($resBody);
});

$app->get('/api/chambres', function (Request $request, Response $response) {
    $query = "SELECT * FROM chambre";
    $dbConn = new DB();
    $dbConn->connect();
    $response = $dbConn->query($query);
    $rooms = [];
    foreach($response as $room) {
        array_push($rooms, (object)[
            "id" => $room["id"],
            "baignoire" => $room["baignoire"],
            "nbCouchage" => $room["nbCouchage"],
            "porte" => $room["porte"],
            "etage" => $room["etage"],
            "idCategorie" => $room["idCategorie"],
            "prixBase" => $room["prixBase"]
        ]);
    };
    $res = new Res();
    return $res->withJson($rooms);
});

$app->get('/api/category', function (Request $request, Response $response) {
    $query = "SELECT * FROM categorie";
    $dbConn = new DB();
    $dbConn->connect();
    $response = $dbConn->query($query);
    $res = new Res();
    return $res->withJson($response);
});

//-------------------GET USER ----------------------------//
// refactor
$app->get('/api/user', function (Request $request, Response $response) {
    $data = $request->getQueryParams();
    $email = $data['email'];
    $mdp = $data['pwd'];
    $query = "SELECT * FROM user WHERE email = '$email'";

    # A VOIR ----------------------------------------------
    $dbConn = new DB();
    $dbConn->connect();
    $response = $dbConn->query($query);
    $status = 0;

    if ($response && gettype($response) != "string" && count($response) > 0) {
        if (password_verify($mdp, $response[0]["mdp"])) {
            $status = 200;
        } else {
            $status = 401;
        }
    } else {
        $status = 401;
    }

    $res = new Res();
    # A VOIR ----------------------------------------------
    return $res->withStatus($status);
});

//-------------------POST USER ----------------------------//

$app->post('/api/user', function (Request $request, Response $response) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $email = $data['email'];
    $name = $data["name"];
    $mdp = $data['pwd'];
    $surname = $data["surname"];
    if (strlen($email) > 0 && strlen($mdp) > 0 && strlen($name) > 0 && strlen($surname) > 0) {
        $mdp = password_hash($mdp, PASSWORD_DEFAULT);
        $query = "INSERT INTO user (email, nom, prenom, mdp) VALUES ('$email', '$surname', '$name', '$mdp')"; 
        $dbConn = new DB();
        $dbConn->connect();
        $response = $dbConn->update($query);

        if ($response && !str_contains($response, "SQL")) {
            $status = 201;
        } else {
            $status = 500;
        }
    } else {
        $status = 500;
    }

    $res = new Res();
    return $res->withStatus($status);
});

$app->post('/addUser', function (Request $request, Response $response) {
    $body = $request->getBody();
    $data = json_decode($body, true);
    $tel = $data['tel'];
    $name = $data['name'];
    $surname = $data["surname"];

    if (strlen($tel) > 0 && strlen($name) > 0 && strlen($surname) > 0) {
        $dateNow = date("Y-m-d");
        $query = "INSERT INTO client (nom, prenom, tel, dateInscription) VALUES ('$name', '$surname', '$tel', '$dateNow')";
        $dbConn = new DB();
        $dbConn->connect();
        $response = $dbConn->update($query);

        if ($response && !str_contains($response, "SQL")) {
            $status = 201;
        } else {
            $status = 500;
        }
    } else {
        $status = 500;
    }

    $res = new Res();
    return $res->withStatus($status);
});


$app->delete('/api/user/{id}', function (Request $request, Response $response) {
    $userId = $request->getAttribute('id');
    
    if (intval($userId) !== 0) {
        $query = "DELETE FROM user WHERE id = $userId";
        $dbConn = new DB();
        $dbConn->connect();
        $res = $dbConn->update($query);
    } else {
        $resBody = array('message' => "Le id saisie n'est pas un nombre ou est égal à 0. Choisissez un autre id svp.");
    }

    $res = new Res();
    return $res->withJson($resBody);
});


//add more things for modification
$app->put('/api/user', function (Request $request, Response $response) {
    $body = $request->getBody();
    $data = json_decode($body, true);

    $userId = $data["id"];
    $email = $data["email"];

    if (intval($userId) !== 0 && strlen($email) > 0) {
        $query = "UPDATE user SET email= '$email' WHERE id=$userId";
        $dbConn = new DB();
        $dbConn->connect();
        $res = $dbConn->update($query);
    } else {
        $resBody = array('message' => "Le id saisie n'est pas un nombre ou est égal à 0. Choisissez un autre id svp.");
    }
    
    $res = new Res();
    return $res->withJson($resBody);

});

$app->run();
