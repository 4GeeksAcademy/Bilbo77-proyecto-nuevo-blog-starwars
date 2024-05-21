import React from "react";
import { Link } from "react-router-dom";
import starwars from "../../img/starwars.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<span className="navbar-brand ps-3">
					<img className="rounded-circle" width="100" height="75" src={starwars} />
				</span>
			</Link>
			<button type="button" className="btn btn-primary position-relative">
  Inbox
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span className="visually-hidden">unread messages</span>
  </span>
</button>
		</nav>
	);
};
