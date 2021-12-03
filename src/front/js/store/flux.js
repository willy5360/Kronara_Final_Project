const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: `${PROTOCOL}://${PORT}-${HOST}/api/`,
			currentMembers: []
		},
		actions: {
			register: async data => {
				try {
					let response = await fetch(getStore().baseUrl.concat("member"), {
						method: "POST",
						mode: "cors",
						redirect: "follow",
						headers: new Headers({
							"Content-Type": "text/plain"
						}),
						body: JSON.stringify(data)
					});
					console.log(response);

					if (response.ok) {
						let newMember = await response.json();
						setStore({ currentMembers: { ...getStore().member, ...responseAsJson.results } });
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
