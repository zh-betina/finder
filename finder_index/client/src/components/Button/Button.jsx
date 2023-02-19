import React from "react";
import "./Button.css";

function Button(props) {
    return (
        <button className={`button ${props.type ?? 'button_primary'}`}>
            {props.text}
        </button>
    )
}

export default Button;