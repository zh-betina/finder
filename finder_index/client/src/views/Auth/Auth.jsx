import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Auth.css";
import Connection from "./ConnectionForm";
import Registration from "./Registration";

function Auth() {
    const [formType, setFormType] = useState("connect");

    return (
        <main className="auth">
            <Header>
                <section className="auth_form">
                    {
                        formType == "connect" &&
                        <Connection setFormType={setFormType} />
                    }
                    {
                        formType == "register" &&
                        <Registration setFormType={setFormType}/>
                    }
                </section>
            </Header>
        </main>
    )
}

export default Auth;