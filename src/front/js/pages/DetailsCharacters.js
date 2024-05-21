import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import '../../styles/Scroll.css';


export const DetailsCharacters = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [characterUno, setCharacterUno] = useState({});
    const [characterImage, setCharacterImage] = useState("");

    useEffect(() => {
        if (store.Characters && store.Characters[params.personaje]) {
            fetchCharacterData();
        }
    }, [store.Characters, params.personaje]);

    const fetchCharacterData = () => {
        fetch(`https://www.swapi.tech/api/people/${params.personaje}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCharacterUno(data.result.properties);
                const characterImage = `https://starwars-visualguide.com/assets/img/characters/${parseInt(params.personaje) + 1}.jpg`;
                setCharacterImage(characterImage);
            })
            .catch((error) => {
                console.error('Error fetching character:', error);
            });
    };

    if (!store.Characters || !store.Characters[params.personaje]) {
        return <div>Loading...</div>;
    }

    const character = store.Characters[params.personaje];

    return (
        <>
            <div className="container d-flex">
                <div className="">
                    <img src={characterImage} className="character-image pt-3" alt="character" />
                </div>
                <div className="p-4">
                    <h1 className="text-center pt-5 text-danger">{character.name}</h1>
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
        <p className='text-primary'><u>Height:</u></p>
        <p>{character.height}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Mass:</u></p>
        <p>{character.mass} kg</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Hair Color:</u></p>
        <p>{character.hair_color}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Skin Color:</u></p>
        <p>{character.skin_color}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Eye Color:</u></p>
        <p>{character.eye_color}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Birth year:</u></p>
        <p>{character.birth_year}</p>
    </div>
    <div className="block">
        <p className='text-primary'><u>Gender:</u></p>
        <p>{character.gender}</p>
    </div>
</div>

        </>
    );
};
