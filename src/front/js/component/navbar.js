import React, { useContext } from "react";
import { Link } from "react-router-dom";
import starwars from "../../img/starwars.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, action } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<span className="navbar-brand ps-3">
					<img className="rounded-circle" width="100" height="75" src={starwars} />
				</span>
			</Link>
			<div>
                <div className="btn-group botonFav">
                    <button type="button" className="btn orange-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites {store.Fav.length}
                    </button>
                    <ul className="dropdown-menu">
                        {store.Fav.map((item, index) => (
                            <li key={index}>
                                <a className="dropdown-item">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
