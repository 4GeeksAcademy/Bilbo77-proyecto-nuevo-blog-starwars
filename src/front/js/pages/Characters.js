import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/Scroll.css'; 

export const Characters = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <h1 className="text-center jumping-text">Characters</h1>
            {!store.Characters ? 'Leyendo'
                :
                <div className="scroll-container">
                    {store.Characters.map((item, index) =>
                        <div key={index} className="card" style={{ width: '18rem' }}>
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${parseInt(index) + 1}.jpg`} className="card-img-top" alt="character" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Gender: {item.gender}</p>
                                <p className="card-text">Mass: {item.mass}</p>
                                <Link to={'DetailsCharacters/' + index}>
                                    <button className="btn orange-btn">Learn more</button>
                                </Link>
                                <span onClick={() => actions.favorites(item.name)}>
                                {actions.changeColor(item.name)?<i className="fa-solid fa-heart-circle-minus float-end fa-lg pt-3 text-danger "></i>
                                :
                                <i className="fa-solid fa-heart-circle-plus float-end fa-lg pt-3 text-success"></i>}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};
