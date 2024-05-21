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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum tincidunt turpis, ac consequat
                        nisl sollicitudin sed. Phasellus lacinia viverra varius. In eleifend, lectus at rhoncus lacinia, eros leo mollis
                        eros, quis tincidunt mauris risus ac eros. Praesent ultricies, lacus sed pretium aliquam, dolor mi euismod turpis,
                        condimentum fringilla velit enim ut nulla. Nullam efficitur finibus enim, quis feugiat orci blandit eu. In vitae
                        volutpat felis. Donec ut sapien felis. Cras tempus varius ligula, vel dignissim massa gravida vitae. Curabitur
                        bibendum justo nec diam imperdiet, in ultrices leo scelerisque. Nam tristique enim sed nunc molestie rutrum.
                        Suspendisse posuere arcu ut velit viverra interdum. Duis ut risus nec leo fringilla malesuada. Nunc quis auctor
                        neque. Aliquam posuere vel magna vel finibus.
                        Mauris a ante erat. Fusce nec neque at nibh pretium accumsan sit amet et erat. Nam accumsan pellentesque pretium.
                        Suspendisse suscipit pellentesque aliquam. Donec hendrerit felis lectus, eget iaculis turpis mollis vel.
                        Pellentesque in sapien eget lorem sagittis scelerisque. Nunc eget fermentum elit, sed porttitor arcu.
                        Fusce quis lobortis tellus. Aliquam erat volutpat.</p>
                </div>
            </div>
            <hr className="bg-danger border-2 border-top border-danger pt-2 mt-3" style={{ width: '80%', height: '4px', margin: '0 auto' }} />


            <div className="container d-flex justify-content-center mt-2">
    <div className="block">
        <p className='text-primary'><u>Diameter:</u></p>
        <p>{planet.diameter} km</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Population:</u></p>
        <p>{planet.population} hab</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Gravity:</u></p>
        <p>{planet.gravity}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Climate:</u></p>
        <p>{planet.climate}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Terrain:</u></p>
        <p>{planet.terrain}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Rotation Period:</u></p>
        <p>{planet.rotation_period} years</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Orbital Period</u></p>
        <p>{planet.orbital_period} years</p>
    </div>
</div>

        </>
    );
};