import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Nav from "./components/Nav/Nav";
import Chambres from "./views/Chambres/Chambres";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chambres" element={<Chambres />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
