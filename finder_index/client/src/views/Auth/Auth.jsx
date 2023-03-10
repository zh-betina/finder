import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./Auth.css";
import Connection from "./ConnectionForm";
import Registration from "./Registration";

function Auth(props) {
    const [formType, setFormType] = useState("connect");

    return (
        <main className="auth">
            <Header>
                <section className="auth_form">
                    {
                        formType == "connect" &&
                        <Connection setIsConnected={props.setIsConnected} setFormType={setFormType} />
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