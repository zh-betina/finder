import React from "react";
import "./Input.css";
import "./SearchInput.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchInput() {
    return (
        <label className="input-search-box">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            <input className="input" type="text" placeholder="Chercher" />
        </label>
    )
}

export default SearchInput;