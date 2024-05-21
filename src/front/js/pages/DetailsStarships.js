/* import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const DetailsStarships = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
        <div>
             <h1>Details Starships</h1>
        </div>
        </>
    );
}; */

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
        <p className='text-primary'><u>Model:</u></p>
        <p>{starship.model}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Capacity:</u></p>
        <p>{starship.cargo_capacity} kg</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Starship Class:</u></p>
        <p>{starship.starship_class}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Manufacturer:</u></p>
        <p>{starship.manufacturer}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Length:</u></p>
        <p>{starship.length}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Max atmosphering speed:</u></p>
        <p>{starship.max_atmosphering_speed}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Consumables:</u></p>
        <p>{starship.consumables}</p>
    </div>
</div>

        </>
    );
};