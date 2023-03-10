import React, { useEffect, useLayoutEffect, useState } from "react";
import "./CookiesFooter.css";
import Button from "../Button/Button";

function CookiesFooter({ cookiesAccepted }) {
    const [displayInfo, setDisplayInfo] = useState(!cookiesAccepted);

    useEffect(()=>{
        setDisplayInfo(!cookiesAccepted);
    }, [cookiesAccepted])

    const acceptCookies = ()=> {
        localStorage.setItem("cookiesAccept", true);
        setDisplayInfo(false);
    }

    if (displayInfo) {
        return (
            <div className="cookies-footer">
                <div>
                    <h5>Vos préférences en matière de cookies</h5>
                    <p className="cookies-footer-text">Afin d'assurer le bon fonctionnement du site, 
                        nous vous informons que nous utilisons des cookies. 
                        Libre à vous d'accepter, de refuser et de changer d'avis à tout moment.
                        Pour en savoir plus concernant le traitement de vos données,
                        cliquez sur le bouton “En savoir plus”.
                    </p>
                    <p>En savoir plus</p>
                </div>
                <Button event={acceptCookies}
                text="Accepter & Fermer"/>
            </div>
        )
    }
}

export default CookiesFooter;