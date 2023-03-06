import React from "react";
import "./Button.css";

function Button(props) {
    return (
        <button
            onClick={()=> {
                if (props.event) props.event();
            }}
            className={`button ${props.type ?? 'button_primary'}`}>
            {props.text}
        </button>
    )
}

export default Button;