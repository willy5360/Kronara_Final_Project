const getState = ({ getStore, getActions, setStore }) => {
	const PORT = 3001;
	const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

	
	return {
		store: {
			URL: `${PROTOCOL}://${PORT}-${HOST}/api/task/`,
			list:[]
			
		},
		actions: {
			getTask:()=>{				
				fetch(getStore().URL, {
					method: "GET"
				})
					.then(response => {
						if (!response.ok) {
							throw new Error("Fail");
						}
						return response.json();
					})
					.then(responseAsJason => {
						setStore({list: [ ...responseAsJason]});
					})
					.catch(error => {
						console.log(error);
					});
			
			},
			deleteTask:(indexList)=>{
				fetch(getStore().URL.concat(indexList), {method: "DELETE"})
				.then(response => {
					if (!response.ok) {
						throw new Error("Fail");
					}
					return response.json();
				})
				.then(responseAsJason => {
					return setStore({list: responseAsJason})
				})
				.catch(err => console.log(err));
				
			},
			submitTask:(item)=>{
				fetch(getStore().URL, {
					method: "POST",
					body: JSON.stringify(item),
					headers:{
						'Content-Type':'application/json'
					}	
				})
				.then(res => res.json())
				.then(responseAsJason => {
					setStore({list: [ ...getStore().list , responseAsJason]});
				})
				.catch(err => console.log(err));
			}
			
			
		}
	};
};

export default getState;
