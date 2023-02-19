import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Nav from "./components/Nav/Nav";
import Chambres from "./views/Chambres/Chambres";
import Auth from "./views/Auth/Auth";

function App() {
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
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
