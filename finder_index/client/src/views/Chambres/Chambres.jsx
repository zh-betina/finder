import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Chambres.css";
import { getRooms } from "../../api/rooms.api";
import Header from "../../components/Header/Header";
import Chambre from "./Chambre";
import Toolbox from "./Toolbox";

function Chambres() {
  const [rooms, setRooms] = useState([]);
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const { state } = useLocation();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (state == null) {
      getRooms().then((res) => {
        setRooms(res.data);
        setDisplayedRooms(res.data);
      });
    } else {
      setRooms(state);
      setDisplayedRooms(state);
    }
  }, []);

  console.log(searchValue);
  return (
    <main className="chambres">
      <Header>
        <div className="chambres-top">
          <Toolbox searchValue={searchValue} setSearchValue={()=> setSearchValue()} />
          {displayedRooms.length > 0 && <h4 className="rooms-nb-info">{displayedRooms.length} chambres disponibles</h4>}
        </div>
        <div className="chambres_list">
          <div className="chambres-tabs">
          </div>
          <div className="rooms">
            {displayedRooms.length > 0 ? (
              displayedRooms.map((room, idx) => {
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
