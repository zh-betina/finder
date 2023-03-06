import React, { useEffect, useState } from "react";
import "./Chambres.css";
import { getRooms } from "../../api/rooms.api";
import Header from "../../components/Header/Header";
import Chambre from "./Chambre";
import Input from "../../components/Input/Input";

function Chambres() {
  const [rooms, setRooms] = useState([]);
  const CATEGORIES = ["", "Standard", "Confort", "Premium", "Luxe"];

  useEffect(() => {
    getRooms().then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  return (
    <main className="chambres">
      <Header>
        <div className="toolbox">
          <Input type="text" placeholder="Chercher" />
          <div className="filter_choice">
            <h3>Filtrer par :</h3>
            <label>
              <input type="checkbox" />
              hôtel
            </label>
            <label>
              <input type="checkbox" />
              prix
            </label>
            <label>
              <input type="checkbox" />
              nombre de couchages
            </label>
            <label>
              <input type="checkbox" />
              étage
            </label>
            <label>
              <input type="checkbox" />
              categorie
            </label>
          </div>
        </div>
        <div className="chambres_list">
          <div className="rooms">
            {rooms.length > 0 ? (
              rooms.map((room, idx) => {
                return (
                  <Chambre
                    key={idx}
                    nbCouchage={room.nbCouchage ?? room.nbcouchage}
                    etage={room.etage}
                    baignoire={room.baignoire}
                    prixBase={room.prixBase ?? room.prixbase}
                    porte={room.porte}
                    categorie={room.idCategorie ?? room.idcategorie}
                    hotel={room.hotel}
                  />
                );
              })
            ) : (
              <p>No rooms found</p>
            )}
          </div>
        </div>
      </Header>
    </main>
  );
}

export default Chambres;
