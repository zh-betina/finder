<?php

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth
{
    private $login;
    private $pwd;
    private $TOKEN_ALGO = 'RS512';

    function __construct($login, $pwd)
    {
        $this->login = $login;
        $this->pwd = $pwd;
    }

    private function isUserOk() {
        $query = "SELECT * FROM user WHERE email = '$this->login'";

        $dbConn = new DB();
        $dbConn->connect();
        $response = $dbConn->query($query);

        if ($response && gettype($response) != "string" && count($response) > 0) {
            if (password_verify($this->pwd, $response[0]["mdp"])) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

        return false;
    }

    public function obtainToken() {
        $isAllowed = $this->isUserOk();

        if ($isAllowed) {
            return $this->getTokenJWT();
        }
    }

    private function getTokenJWT() {
        $payload = ["exp" => time() + (60 * 30)];
        return JWT::encode($payload, "secret", $this->TOKEN_ALGO);
    }

    function isTokenValid($token, $key) {
        $isValid = false;

        try {
            $decoded = JWT::decode($token, new Key($key, $this->TOKEN_ALGO));       
        } catch (Exception $e) {
          return $isValid;
        }

        return $isValid = true;
    }


}