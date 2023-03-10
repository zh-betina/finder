import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { createAcct } from "../../api/auth.api";

function Registration({ setFormType }) {
  
  const [form, setForm] = useState({
    "email": "",
    "password": "",
    "bday": ""
  });

  return (
    <>
      <div className="auth_form_connect">
        <h2>Création du compte</h2>
        <Input onChange={(e)=> setForm({...form, "email": e.target.value})} type="email" placeholder="john.doe@example.fr" />
        <Input type="email" placeholder="Repeter le mail" />
        <Input onChange={(e)=> setForm({...form, "password": e.target.value})} type="password" placeholder="Mot de passe" />
        <Input type="password" placeholder="Repeter le mot de passe" />
        <Input onChange={(e)=> setForm({...form, "bday": e.target.value})} type="date" placeholder="Date de naissance" />
        <Button event={()=> createAcct(form)} text="Je crée mon compte" type="button_secondary" />
      </div>
      <div className="auth_form_register">
        <h6>J'ai déjà un compte</h6>
        <Button event={()=> setFormType("connect")} text="Connexion" type="button_secondary" />
      </div>
    </>
  );
}

export default Registration;