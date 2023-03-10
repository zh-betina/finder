import React from "react";
import "./Toolbox.css";
import SearchInput from "../../components/Input/SearchInput";


function Toolbox() {
    return (
        <div className="toolbox">
          <SearchInput />
          <div className="filter_choice">
            <h3>Filtrer par :</h3>
            <label>
              <input type="checkbox" />
              hôtel
            </label>
            <label>
              <input type="checkbox" />
              prix
            </label>
            <label>
              <input type="checkbox" />
              nombre de couchages
            </label>
            <label>
              <input type="checkbox" />
              étage
            </label>
            <label>
              <input type="checkbox" />
              categorie
            </label>
          </div>
        </div>
    )
};

export default Toolbox;