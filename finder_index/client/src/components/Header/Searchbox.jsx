import React, { useState } from "react";
import "./Searchbox.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { getAvailableRooms } from "../../api/rooms.api";
import { useNavigate } from "react-router-dom";

function Searchbox() {
  const [payload, setPayload] = useState({
    start: "",
    end: "",
    peopleNb: null
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  const getAvailableRoomsHandler = ()=> {
    getAvailableRooms(payload)
    .then((res)=> {
      if (res.data.length > 0) {
        navigate('/chambres', {
          state: res.data
        });
      } else {
        setMessage("Pas de chambres avec les critères choisies disponibles")
      }
    });
  };

  return (
    <>
      <div className="header_searchbox">
        <Input
          onChange={(e)=> setPayload({...payload, start: e.target.value})}
          type="date"
          placeholder="Date d'arrivée"
        />
        <Input
          onChange={(e)=> setPayload({...payload, end: e.target.value})}
          type="date"
          placeholder="Date de départ" 
        />
        <Input 
          onChange={(e)=> setPayload({...payload, peopleNb: e.target.value})}
          type="number"
          placeholder="Nombre de personnes" />
        <Button event={()=> getAvailableRoomsHandler()} type="button_secondary" text="Chercher"></Button>
      </div>
      {message.length > 0 && <p>{message}</p>}
    </>
  );
}

export default Searchbox;