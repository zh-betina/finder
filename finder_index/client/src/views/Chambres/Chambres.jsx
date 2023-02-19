import React, { useEffect, useState } from "react";
import "./Chambres.css";
import { getAmorRooms } from "../../api/rooms.api";

function Chambres() {

    const [rooms, setRooms] = useState([]);

    useEffect(()=> {
        getAmorRooms().then((res)=>
            setRooms(res.data))
        },[]);

    return (
        <main className="chambres">
            {
                rooms.length > 0 ? rooms.map((room, idx)=> {
                    return (
                        <div key={idx}>{room.prixBase}</div>
                    )
                })
                : <p>No rooms found</p>
            }
        </main>
    )
}

export default Chambres;