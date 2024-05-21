import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/Scroll.css'; 
import imageNotFound from '../../img/imagenotfoundsw.jpg';  // Importar la imagen alternativa

export const Starships = () => {
    const { store } = useContext(Context);

    const handleImageError = (event) => {
        event.target.src = imageNotFound;  // URL de la imagen alternativa
        event.target.style.objectFit = 'cover';  // Ajustar la imagen alternativa
    };

    return (
        <>
            <h1 className="text-center mt-5">Starships</h1>
            {!store.Starships ? 'Leyendo'
                :
                <div className="scroll-container">
                    {store.Starships.map((item, index) =>
                        <div key={index} className="container mt-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <img 
                                    src={`https://starwars-visualguide.com/assets/img/starships/${index+6}.jpg`} 
                                    className="card-img-top" 
                                    alt="starship" 
                                    onError={handleImageError}  // Manejar el error de la imagen
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Model: {item.model}</p>
                                    <p className="card-text">Capacity: {item.cargo_capacity} people</p>
                                    <Link to={'DetailsStarships/' + index}>
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
