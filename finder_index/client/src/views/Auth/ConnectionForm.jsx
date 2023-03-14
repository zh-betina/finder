import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { login } from "../../api/auth.api";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Connection.css";

function Connection({ setFormType, setIsConnected }) {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    "email": "",
    "password": ""
  });

  const loginHandler = ()=> {
    login(form)
    .then((res)=> {
      if (res && res.data.code == 201){
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          setIsConnected(true);
        }, 2000);
        navigate('/');
      } else {
        setIsConnected(false);
      }
    });
  }

  return (
    <>
      <div className="auth_form_connect">
        <h2>Connexion</h2>
        <Input onChange={(e)=> setForm({...form, "email": e.target.value})} type="email" placeholder="john.doe@example.fr" />
        <Input onChange={(e)=> setForm({...form, "password": e.target.value})} type="password" placeholder="Mot de passe" />
        <Button event={loginHandler} text="Je me connecte" type="button_secondary" />
      </div>
      <div className="auth_form_register">
        <h6>Je n'ai pas de compte</h6>
        <Button event={()=> setFormType("register")} text="Inscription" type="button_secondary" />
      </div>
    </>
  );
}

export default Connection;
