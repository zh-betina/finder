import React, { useEffect, useState } from "react";
import "./Chambres.css";
import { getRooms } from "../../api/rooms.api";
import Header from "../../components/Header/Header";
import Chambre from "./Chambre";
import Toolbox from "./Toolbox";

function Chambres() {
  const [rooms, setRooms] = useState([]);
  const CATEGORIES = ["", "Standard", "Confort", "Premium", "Luxe"];
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  return (
    <main className="chambres">
      <Header>
        <div className="chambres-top">
          <Toolbox />
          {rooms.length > 0 && <h4 className="rooms-nb-info">{rooms.length} chambres disponibles</h4>}
        </div>
        <div className="chambres_list">
          <div className="chambres-tabs">
          </div>
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
              <p>Pas de chambres disponibles</p>
            )}
          </div>
        </div>
      </Header>
    </main>
  );
}

export default Chambres;
