import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Nav from "./components/Nav/Nav";
import Chambres from "./views/Chambres/Chambres";
import Auth from "./views/Auth/Auth";
import CookiesFooter from "./components/CookiesFooter/CookiesFooter";
import { useEffect, useState } from "react";

function App() {

  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(()=> {
    const localStorageInfo = JSON.parse(localStorage.getItem("cookiesAccept")) ?? localStorage.setItem("cookiesAccept", false);
    setCookiesAccepted(localStorageInfo ?? false);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chambres" element={<Chambres />} />
            <Route path="/connexion" element={<Auth />} />
          </Routes>
          <CookiesFooter cookiesAccepted={cookiesAccepted} />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
