const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: `${PROTOCOL}://${PORT}-${HOST}/api/`,
			currentMembers: [],
			member: []
		},

		actions: {
			register: data => {
				console.log('action: ', data);
				fetch(getStore().baseUrl.concat("member/"), {
					method: "POST", 
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				})
					.then (response => {
						if (response.ok) {
							return response.json();
						}
						throw new Error("fail getting data");
					} )
					.then(responseAsJSON => {
						console.log(responseAsJSON.results)
						setStore({ currentMembers: responseAsJSON.data});
					})
					.catch(error => {
						console.log(error);
						console.log(getStore().baseUrl.concat("member/"));
					}
				);
			}
		}
	};
};

export default getState;
