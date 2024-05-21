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
                    <p className="text-white star-wars-font">Los personajes de Star Wars son figuras icónicas que han capturado la imaginación de millones de fans en todo el mundo. Cada uno de estos personajes está imbuido de una rica historia y personalidad que contribuye significativamente al vasto universo creado por George Lucas. Ya sea un valiente Jedi, un siniestro Sith, un astuto contrabandista o un valiente líder rebelde, cada personaje ofrece una perspectiva única y una historia fascinante. Desde sus primeras apariciones, estos personajes han sido definidos por sus habilidades extraordinarias, sus luchas internas y sus misiones heroicas. Los Jedi, por ejemplo, son conocidos por su conexión con la Fuerza, que les otorga poderes sobrehumanos y una sabiduría profunda. Por otro lado, los Sith, con su ambición desmedida y su uso del lado oscuro de la Fuerza, representan una amenaza constante a la paz en la galaxia. La dualidad entre estos dos grupos añade una capa de complejidad y dramatismo que ha sido fundamental para la narrativa de Star Wars.
                    Además de sus roles en la lucha entre el bien y el mal, los personajes de Star Wars son también queridos por sus relaciones y sus historias personales. A través de sus viajes y aventuras, han demostrado valentía, lealtad y redención. Las interacciones entre personajes como amigos, mentores y rivales, enriquecen sus historias y las hacen más resonantes. Estos personajes han evolucionado a lo largo de las trilogías, mostrando crecimiento personal y desarrollo. Desde aprender a controlar sus poderes hasta enfrentar sus miedos más profundos, cada personaje tiene un arco que añade profundidad a la saga. Los personajes secundarios, aunque a veces en la sombra de los protagonistas, también tienen historias impactantes que contribuyen al mosaico general. Ya sea luchando en batallas épicas o enfrentando dilemas morales, los personajes de Star Wars siguen siendo un componente crucial que mantiene viva la fascinación y el amor por esta franquicia intergaláctica.</p>
                </div>
            </div>
            <hr className="bg-danger border-2 border-top border-danger pt-2 mt-3" style={{ width: '80%', height: '4px', margin: '0 auto' }} />


            <div className="container d-flex justify-content-center mt-2 ">
                <div className="block">
                    <p className='text-warning '><u>Height:</u></p>
                    <p className='text-light'>{character.height}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Mass:</u></p>
                    <p className='text-light'>{character.mass} kg</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Hair Color:</u></p>
                    <p className='text-light'>{character.hair_color}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Skin Color:</u></p>
                    <p className='text-light'>{character.skin_color}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Eye Color:</u></p>
                    <p className='text-light'>{character.eye_color}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Birth year:</u></p>
                    <p className='text-light'>{character.birth_year}</p>
                </div>
                <div className="block">
                    <p className='text-warning'><u>Gender:</u></p>
                    <p className='text-light'>{character.gender}</p>
                </div>
            </div>

        </>
    );
};
