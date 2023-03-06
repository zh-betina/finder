import React from "react";
import "./Chambre.css";

function Chambre(props) {
    return (
        <div className="chambre">
            <h4>Hotel : {props.hotel}</h4>
            <h4>Nombre de personnes : {props.nbCouchage}</h4>
            <h4>Etage : {props.etage}</h4>
            <h4>Baignoire : {props.baignoire}</h4>
            <h4>Prix : {props.prixBase} EUR</h4>
            <h4>Porte d'entrée : {props.porte} </h4>
            <h4>Categorie : {props.categorie}</h4>
        </div>
    )
}

export default Chambre;