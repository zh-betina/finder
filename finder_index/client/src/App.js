import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Nav from "./components/Nav/Nav";
import Chambres from "./views/Chambres/Chambres";
import Auth from "./views/Auth/Auth";
import CookiesFooter from "./components/CookiesFooter/CookiesFooter";
import { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "./store/ConnectionContext";

function App() {

  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(()=> {
    const localStorageInfo = JSON.parse(localStorage.getItem("cookiesAccept")) ?? localStorage.setItem("cookiesAccept", false);
    setCookiesAccepted(localStorageInfo ?? false);
  }, []);


  const connectionContext = useContext(ConnectionContext);
  const [isConnected, setIsConnected] = useState(connectionContext);

  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
        <ConnectionContext.Provider value={isConnected}>
          <Nav setIsConnected={setIsConnected} isConnected={connectionContext} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chambres" element={<Chambres />} />
              {isConnected
                ? <Route path="/logout" />
                : <Route path="/connexion" element={<Auth setIsConnected={setIsConnected} />} />
              }
              {isConnected && <Route path="/reservations" />}
              {isConnected && <Route path="/account" />}
            </Routes>
          </ConnectionContext.Provider>
          <CookiesFooter cookiesAccepted={cookiesAccepted} />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
