<?php

class DB
{
    private $server = "mysql:host=localhost;dbname=hotela";
    private $user = "admin";
    //private $pwd = "admin";
    private $pwd = "betinaIsCool!23";
    public $connection;


    function connect()
    {
        $this->connection = new PDO($this->server, $this->user, $this->pwd);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    function query($query)
    {
        try {
            $statement = $this->connection->prepare($query);
            $statement->execute();
            $result = $statement->fetchAll();
            return $result;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    function update($query) {
        try {
            $statement = $this->connection->prepare($query);
            $result = $statement->execute();
            return $result;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
}
