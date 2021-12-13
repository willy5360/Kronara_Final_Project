
const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

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
			register: async data => {
				try {
					let response = await fetch(getStore().baseURL.concat("event"), {
						method: "POST",
						mode: "cors",
						redirect: "follow",
						headers: new Headers({
							"Content-Type": "text/plain"
						}),
						body: JSON.stringify(data)
					});
					console.log(response);

					if (response.ok){
						let newEvent =await response.json();
						setStore({currentEvent: {...getStore().member, ...responseAsJson.results }});
						
					}
			}catch(error){
				console.log(error);			

		}
		
		
		},
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
