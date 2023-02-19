import React, { useEffect, useState } from "react";
import "./Chambres.css";
import {
  getAmorRooms,
  getByzanceRooms,
  getCaraibesRooms,
} from "../../api/rooms.api";
import Header from "../../components/Header/Header";
import { getAmorCategories } from "../../api/categories.api";
import Chambre from "./Chambre";

function Chambres() {
  const [roomsAmor, setRoomsAmor] = useState([]);
  const [roomsByz, setRoomsByz] = useState([]);
  const [roomsCaraib, setRoomsCaraib] = useState([]);
  const CATEGORIES = ["", "Standard", "Confort", "Premium", "Luxe"];

  useEffect(() => {
    getAmorRooms().then((res) => {
      setRoomsAmor(res.data);
    });
    getByzanceRooms().then((res) => {
      setRoomsByz(res.data.room);
    });
    getCaraibesRooms().then((res) => {
      setRoomsCaraib(res.data.rooms);
    });
  }, []);

  return (
    <main className="chambres">
      <Header>
        <div className="chambres_list">
            {roomsAmor.length > 0 ? (
                <>
                    <h2>Chambres d'hôtel Amor</h2>
                    <div className="rooms">
                    {roomsAmor.map((room, idx) => {
                        const roomProps = {
                            nbCouchage: room.nbCouchage,
                            etage: room.etage,
                            baignoire: room.baignoire,
                            prixBase: room.prixBase,
                            porte: room.porte,
                            categorie: CATEGORIES[room.idCategorie]
                        }
                        return <Chambre key={idx} {...roomProps}></Chambre>;
                    })}
                    </div>
                </>
            ) : (
                <p>No rooms found</p>
            )}
            {roomsByz.length > 0 ? (
                <>
                <h2>Chambres d'hôtel Byzance</h2>
                <div className="rooms">
                {roomsByz.map((room, idx) => {
                    const roomProps = {
                        nbCouchage: room.nbCouchage,
                        etage: room.etage,
                        baignoire: room.baignoire,
                        prixBase: room.prixBase,
                        porte: room.porte,
                        categorie: CATEGORIES[room.idcategorie]
                    }
                    return <Chambre key={idx} {...roomProps}></Chambre>;
                })}
                </div>
                </>
            ) : (
                <p>No rooms found</p>
            )}

            {roomsCaraib.length > 0 ? (
                <>
                <h2>Chambres d'hôtel Caraibes</h2>
                <div className="rooms">
                {roomsCaraib.map((room, idx) => {
                    const roomProps = {
                        nbCouchage: room.nbCouchage,
                        etage: room.etage,
                        baignoire: room.baignoire,
                        prixBase: room.prixBase,
                        porte: room.porte,
                        categorie: CATEGORIES[room.idCategorie]
                    }
                    return <Chambre key={idx} {...roomProps}></Chambre>;
                })}
                </div>
                </>
            ) : (
                <p>No rooms found</p>
            )}
        </div>
      </Header>
    </main>
  );
}

export default Chambres;
