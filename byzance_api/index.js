const express = require("express");
const cors = require("cors");
const pg = require("pg");

const hostname = "localhost";
const port = 8004;
const app = express();

const pgConnString = "pg://admin:admin@localhost:5432/hotelb";
const pgConn = new pg.Client(pgConnString);
pgConn.connect();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.listen(port, hostname, function () {
  console.log("Server running on http://" + hostname + ":" + port);
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/connection", (req, res) => {
  res.sendFile("public/connection.html", { root: __dirname });
});

app.get("/inscription", (req, res) => {
  res.sendFile("public/inscription.html", { root: __dirname });
});

app.get("/chambre/:id", function (req, res) {
  const roomId = req.params.id;
  pgConn.query(
    `SELECT * FROM chambre WHERE id = ${roomId}`,
    function (error, results, fields) {
      if (error) {
        res.json({ message: "Un problème lors de la requete est survenu" });
      }
      res.json({ room: results.rows });
    }
  );
});

app.get("/chambres", function (req, res) {
  pgConn.query(
    `SELECT * FROM chambre`,
    function (error, results, fields) {
      if (error) {
        res.json({ message: "Un problème lors de la requete est survenu" });
      }
      res.json(results.rows);
    }
  )
});

app.get("/user", function (req, res) {
  const email = req.query.email;
  const pwd = req.query.pwd;
  pgConn.query(
    `SELECT * FROM utilisateur WHERE email = '${email}'`,
    function (error, results, fields) {
      if (error) {
        res.status(401).send();
      } else {
        if (results.rowCount > 0) {
          res.status(200).send();
        } else res.status(401).send();
      }
    }
  );
});

app.post("/user", function (req, res) {
  const email = req.body.email;
  const pwd = req.body.pwd;
  const surname = req.body.surname;
  const name = req.body.name;

  pgConn.query(
    `INSERT INTO utilisateur (email, nom, prenom, mot_de_passe) VALUES ('${email}', '${surname}', '${name}', '${pwd}')`,
    function (error, results, fields) {
      if (error) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    }
  );
});

app.delete("/user/:id", function (req, res) {
  const userId = req.params.id;

  pgConn.query(
    `DELETE FROM utilisateur WHERE id = ${userId}`,
    function (error, results, fields) {
      if (error) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    }
  );
});

app.put("/user?id=:id&email=:email", function (req, res) {
  const userId = req.params.id;
  const email = req.params.email;

  pgConn.query(
      `UPDATE user SET email='${email}' WHERE id=${userId}`,
      function (error, results, fields) {
        if (error) {
          res.status(500).send();
        } else {
          res.status(201).send();
        }
      }
  )
});
