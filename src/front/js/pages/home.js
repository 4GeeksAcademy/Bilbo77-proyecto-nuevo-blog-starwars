import React from "react";
import { Characters } from "./Characters";
import { Planets } from "./Planets";
import { Starships } from "./Starships";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<Characters />
			<Planets />
			<Starships />
		</div>
	);
};
