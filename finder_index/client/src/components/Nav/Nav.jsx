import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../../store/ConnectionContext";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import "./Nav.css";

function Nav({ setIsConnected }) {
    const connectionContext = useContext(ConnectionContext);

    return (
        <nav className="nav">
            <Logo />
            <ul className="nav_list">
                <NavLink to="/chambres">Chambres</NavLink>
                <NavLink to="/apropos">A propos</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                {connectionContext 
                && 
                    (
                        <>
                            <NavLink to="/reservations">Reservations</NavLink>
                            <NavLink to="/account">Compte</NavLink>
                        </>
                    )
                }
            </ul>
            {
                connectionContext 
                ?
                <Button event={()=> {
                    localStorage.removeItem("token");
                    setIsConnected(false);
                }} text="Deconnexion" />
                :
                <NavLink to="/connexion"><Button text="Connexion" /></NavLink>
            }
        </nav>
    )
}

export default Nav;