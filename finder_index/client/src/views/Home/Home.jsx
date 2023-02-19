import React from "react";
import Header from "../../components/Header/Header";
import Searchbox from "../../components/Header/Searchbox";

function Home() {
    return (
        <main className="home">
            <Header><Searchbox /></Header>
        </main>
    )
}

export default Home;