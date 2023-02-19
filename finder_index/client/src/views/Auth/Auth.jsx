import React from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Auth.css";

function Auth() {
    return (
        <main className="auth">
            <Header>
                <section className="auth_form">
                    <div className="auth_form_connect">
                        <h2>Connexion</h2>
                        <Input type="email" placeholder="john.doe@example.fr" />
                        <Input type="password" placeholder="Mot de passe" />
                        <Button text="Je me connecte" type="button_secondary"/>
                    </div>
                    <div className="auth_form_register">
                        <h6>Je n'ai pas de compte</h6>
                        <Button text="Inscription" type="button_secondary" />
                    </div>
                </section>
            </Header>
        </main>
    )
}

export default Auth;