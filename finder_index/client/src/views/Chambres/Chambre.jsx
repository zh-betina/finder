import React from "react";
import "./Chambre.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faBed, faBath, faMoneyBill1Wave, faHotel } from '@fortawesome/free-solid-svg-icons';
import Button from "../../components/Button/Button";

function Chambre(props) {
    return (
        <div className="chambre">
            <div className="chambre-img">
            {
                props.img ? <img src={props.img} alt="#" />
                : <>
                    <FontAwesomeIcon icon={faEyeSlash} />
                    <p>Photo indisponible</p>
                </>
            }
            </div>
            <span className="chambre-head">
                <h3><FontAwesomeIcon className="icon" icon={faHotel} />Hotel {props.hotel}</h3>
                <h4><FontAwesomeIcon className="icon" icon={faMoneyBill1Wave} />{props.prixBase} EUR/nuit</h4>
            </span>
            <h4><FontAwesomeIcon className="icon" icon={faBed} /> {props.nbCouchage}</h4>
            {/* <h4>Etage : {props.etage}</h4> */}
            <h4><FontAwesomeIcon className="icon" icon={faBath} /> {props.baignoire}</h4>
            {/* <h4>Porte d'entrée : {props.porte} </h4> */}
            <h4>Categorie : {props.categorie}</h4>
            <Button type="button_secondary" text="Détailles"></Button>
        </div>
    )
}

export default Chambre;