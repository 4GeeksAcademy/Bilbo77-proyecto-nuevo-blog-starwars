import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/Scroll.css'; 

export const Planets = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <h1 className="text-center mt-5">Planets</h1>
            {!store.Planets ? 'Leyendo'
                :
                <div className="scroll-container">
                    {store.Planets.map((item, index) =>
                        <div key={index} className="container mt-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={`https://starwars-visualguide.com/assets/img/planets/${index+2}.jpg`} className="card-img-top" alt="planet" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Diameter: {item.diameter} km</p>
                                    <p className="card-text">Population: {item.population} hab</p>
                                    <Link to={'DetailsPlanets/' + index}>
                                    <button className="btn btn-primary">Learn more</button>
                                    </Link>
                                    <i className="fa-solid fa-heart-circle-plus float-end fa-lg pt-3"></i>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};

