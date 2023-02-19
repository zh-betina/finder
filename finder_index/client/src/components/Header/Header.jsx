import React from "react";
import "./Header.css";
import Button from "../Button/Button";

function Header() {
    return (
        <header className="header">
            <div className="header_searchbox">
                <input type="date" placeholder="Date d'arrivée"/>
                <input type="date" placeholder="Date de départ"/>
                <input type="number" placeholder="Nombre de personnes"/>
                <Button text="Chercher"></Button>
            </div>
        </header>
    )
}

export default Header;