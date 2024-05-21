import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import '../../styles/Scroll.css';


export const DetailsPlanets = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planetUno, setPlanetUno] = useState({});
    const [planetImage, setPlanetImage] = useState("");

    useEffect(() => {
        if (store.Planets && store.Planets[params.planeta]) {
            fetchPlanetData();
        }
    }, [store.Planets, params.planeta]);

    const fetchPlanetData = () => {
        fetch(`https://www.swapi.tech/api/planets/${params.planeta}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPlanetUno(data.result.properties);
                const planetImage = `https://starwars-visualguide.com/assets/img/planets/${parseInt(params.planeta) + 2}.jpg`;
                setPlanetImage(planetImage);
            })
            .catch((error) => {
                console.error('Error fetching planet:', error);
            });
    };

    if (!store.Planets || !store.Planets[params.planeta]) {
        return <div>Loading...</div>;
    }

    const planet = store.Planets[params.planeta];

    return (
        <>
            <div className="container d-flex">
                <div className="">
                    <img src={planetImage} className="planet-image pt-3" alt="planet" />
                </div>
                <div className="p-4">
                    <h1 className="text-center pt-5 text-danger">{planet.name}</h1>
                    <p className="text-white star-wars-font">Los planetas de Star Wars son escenarios diversos y fascinantes que aportan riqueza al vasto universo de la saga. Cada planeta tiene su propio carácter, ambiente y cultura, haciendo que cada visita sea única. Tatooine, por ejemplo, es un planeta desértico conocido por sus dos soles y su vida dura y aislada. Es el hogar de Luke Skywalker y un lugar crucial en la historia de los Jedi. A pesar de su apariencia árida y desolada, Tatooine es un lugar de encuentros inesperados y aventuras épicas, representando el punto de partida para algunos de los eventos más importantes de la saga.
                       Por otro lado, Coruscant es el centro neurálgico de la galaxia, un planeta-ciudad que alberga los principales órganos de gobierno, incluyendo el Senado Galáctico. Su paisaje urbano y su actividad constante reflejan el complejo entramado político y social de la galaxia. Desde los altos rascacielos hasta los niveles subterráneos, Coruscant es un microcosmos de la galaxia en su conjunto, mostrando tanto su esplendor como su decadencia. Los planetas de Star Wars no solo sirven como telones de fondo, sino que también influyen en la trama y el desarrollo de los personajes, aportando profundidad y dimensión a la historia.</p>
                </div>
            </div>
            <hr className="bg-danger border-2 border-top border-danger pt-2 mt-3" style={{ width: '80%', height: '4px', margin: '0 auto' }} />


            <div className="container d-flex justify-content-center mt-2">
                <div className="block">
                    <p className='text-warning'><u>Diameter:</u></p>
                    <p className='text-light'>{planet.diameter} km</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Population:</u></p>
                    <p className='text-light'>{planet.population} hab</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Gravity:</u></p>
                    <p className='text-light'>{planet.gravity}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Climate:</u></p>
                    <p className='text-light'>{planet.climate}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Terrain:</u></p>
                    <p className='text-light'>{planet.terrain}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Rotation Period:</u></p>
                    <p className='text-light'>{planet.rotation_period} years</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Orbital Period</u></p>
                    <p className='text-light'>{planet.orbital_period} years</p>
                </div>
            </div>

        </>
    );
};