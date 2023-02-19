import './App.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './views/Home/Home';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Layout>
        <Nav />
        <Home />
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
