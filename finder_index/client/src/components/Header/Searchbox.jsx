import React from "react";
import "./Searchbox.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

function Searchbox() {
  return (
    <div className="header_searchbox">
      <Input type="date" placeholder="Date d'arrivée" />
      <Input type="date" placeholder="Date de départ" />
      <Input type="number" placeholder="Nombre de personnes" />
      <Button type="button_secondary" text="Chercher"></Button>
    </div>
  );
}

export default Searchbox;