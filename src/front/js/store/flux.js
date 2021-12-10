const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentHome:{
				id: 1,
				name: "jumbotronas",
				city: "Madrid"
			},
			weather:{}

		},
		actions: {
			getWeather: () =>{
				fetch(`${process.env.WEATHER_BASE_URL}q=${getStore().currentHome.city}&units=metric&APPID=${process.env.WEATHER_API_KEY}`)
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error("fail loading weather");
                })
                .then(responseAsJSON => {
                    console.log("aqui esta el response asjson", responseAsJSON.main);
                    setStore({weather:{...responseAsJSON.main}})
                })
                .catch(error => {
                    console.log(error);
                })
			}
		}
	};
};

export default getState;
