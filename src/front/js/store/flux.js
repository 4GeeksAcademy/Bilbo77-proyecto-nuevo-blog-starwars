const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			Characters: [],
			Planets: [],
			Starships: [],
			Fav: [],
			currentUser: null,
			isLogin: false,
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.text()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getCharacters: async () => {
				const uri = "https://swapi.dev/api" + "/people"
				const response = await fetch(uri);
				if (!response.ok) {
					// Aquí manejamos el error que devolvió el request HTTP 
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				// De aquí en adelante es la lógica que está en flux
				setStore({ Characters: data.results });
			},

			getPlanets: async () => {
				const uri = "https://swapi.dev/api" + "/planets"
				const response = await fetch(uri);
				if (!response.ok) {
					// Aquí manejamos el error que devolvió el request HTTP 
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				// De aquí en adelante es la lógica que está en flux
				setStore({ Planets: data.results });
			},

			getStarships: async () => {
				const uri = "https://swapi.dev/api" + "/starships"
				const response = await fetch(uri);
				if (!response.ok) {
					// Aquí manejamos el error que devolvió el request HTTP 
					console.log('error: ', response.status, response.statusText);
					return { error: { status: response.status, statusText: response.statusText } };
				};
				const data = await response.json();
				console.log(data)
				// De aquí en adelante es la lógica que está en flux
				setStore({ Starships: data.results });
				//Results[0].url

			},

			favorites: (newFav) => {
				const store = getStore();
				if (store.Fav.includes(newFav)) {
					setStore({ Fav: store.Fav.filter((repeated) => repeated != newFav) }); //sacarlo si está repetido
				} else {
					setStore({ Fav: [...store.Fav, newFav] }); //añadirlo si no está a la lista que ya hay de favoritos
				}
			},

			changeColor: (pers) => {
				const store = getStore();
				return store.Fav.includes(pers);
			},

			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ isLogin: true, currentUser: data.results });
				} catch (error) {
					console.error("There has been a problem with your fetch operation:", error);
				}
			},

			signup: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token);
					setStore({ isLogin: true, currentUser: data.results });
				} catch (error) {
					console.error("There has been a problem with your fetch operation:", error);
				}
			},
		}
	};
};

export default getState;
