import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import '../../styles/Scroll.css';


export const DetailsStarships = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [starshipUno, setStarshipUno] = useState({});
    const [starshipImage, setStarshipImage] = useState("");

    useEffect(() => {
        if (store.Starships && store.Starships[params.nave]) {
            fetchStarshipsData();
        }
    }, [store.Starships, params.nave]);

    const fetchStarshipsData = () => {
        fetch(`https://www.swapi.tech/api/starships/${params.nave}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setStarshipUno(data.result.properties);
                const starshipImage = `https://starwars-visualguide.com/assets/img/starships/${parseInt(params.nave) + 6}.jpg`;
                setStarshipImage(starshipImage);
            })
            .catch((error) => {
                console.error('Error fetching starship:', error);
            });
    };

    if (!store.Starships || !store.Starships[params.nave]) {
        return <div>Loading...</div>;
    }

    const starship = store.Starships[params.nave];

    return (
        <>
            <div className="container d-flex">
                <div className="">
                    <img src={starshipImage} className="starship-image pt-3" alt="starship" />
                </div>
                <div className="p-4">
                    <h1 className="text-center pt-5 text-danger">{starship.name}</h1>
                    <p className="text-white star-wars-font">Las naves de Star Wars son elementos fundamentales en la narrativa, cada una con su propia historia y significado en la galaxia. Desde el icónico Millennium Falcon hasta los imponentes destructores estelares del Imperio, estas naves son más que simples vehículos; son símbolos de los ideales y las fuerzas en conflicto en la lucha por el control de la galaxia. El Falcon, pilotado por Han Solo y Chewbacca, encarna la astucia y la libertad, capaz de desafiar cualquier obstáculo en su camino. Por otro lado, las naves imperiales, como los destructores estelares, representan la opresión y el poder militar absoluto del Imperio, utilizadas para imponer su voluntad y mantener el orden en la galaxia. En conjunto, estas naves son testigos y participantes en los eventos más importantes de la saga, agregando profundidad y emoción a la narrativa cósmica de Star Wars.</p>
                </div>
            </div>
            <hr className="bg-danger border-2 border-top border-danger pt-2 mt-3" style={{ width: '80%', height: '4px', margin: '0 auto' }} />


            <div className="container d-flex justify-content-center mt-2">
                <div className="block">
                    <p className='text-warning'><u>Model:</u></p>
                    <p className='text-light'>{starship.model}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Capacity:</u></p>
                    <p className='text-light'>{starship.cargo_capacity} kg</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Starship Class:</u></p>
                    <p className='text-light'>{starship.starship_class}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Manufacturer:</u></p>
                    <p className='text-light'>{starship.manufacturer}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Length:</u></p>
                    <p className='text-light'>{starship.length}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Max atmosphering speed:</u></p>
                    <p className='text-light'>{starship.max_atmosphering_speed}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Consumables:</u></p>
                    <p className='text-light'>{starship.consumables}</p>
                </div>
            </div>

        </>
    );
};