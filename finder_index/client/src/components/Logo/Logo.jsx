import React from "react";
import "./Logo.css";
import { NavLink } from 'react-router-dom';

import logo from "../../assets/img/logo.png";

function Logo() {
    return (
        <NavLink to="/">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
        </NavLink>
    )
}

export default Logo;