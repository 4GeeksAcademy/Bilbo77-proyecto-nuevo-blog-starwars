import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Characters } from "./pages/Characters";
import { Planets } from "./pages/Planets";
import { Starships } from "./pages/Starships";

import { DetailsCharacters } from "./pages/DetailsCharacters";
import { DetailsPlanets } from "./pages/DetailsPlanets";
import { DetailsStarships } from "./pages/DetailsStarships";
import { Login } from "./pages/Login"; // Importar el componente de Login
import { Signup } from "./pages/Signup"; // Importar el componente de Signup

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<DetailsCharacters />} path="/detailscharacters/:personaje" />
                        <Route element={<DetailsPlanets />} path="/detailsplanets/:planeta" />
                        <Route element={<DetailsStarships />} path="/detailsstarships/:nave" />
                        <Route element={<Login />} path="/login" /> {/* Añadir ruta de Login */}
                        <Route element={<Signup />} path="/signup" /> {/* Añadir ruta de Signup */}
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer /> 
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
