import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import "./Nav.css";

function Nav() {
    return (
        <nav className="nav">
            <Logo />
            <ul className="nav_list">
                <NavLink to="/chambres">Chambres</NavLink>
                <NavLink to="/apropos">A propos</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </ul>
            <NavLink to="/connexion"><Button text="Connexion"></Button></NavLink>
        </nav>
    )
}

export default Nav;