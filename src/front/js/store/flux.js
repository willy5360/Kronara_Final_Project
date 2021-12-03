
const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					baseUrl: `{PROTOCOL}://${PORT}-${HOST}/api/`,
					currentEvent :[]
					
				}
			]
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
		}
		}
	};
};


export default getState;
