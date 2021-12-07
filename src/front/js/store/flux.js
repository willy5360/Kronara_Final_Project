const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			holiday:[]

		},
		actions: {
			getHoliday: () =>{
				fetch(`${process.env.HOLIDAY_BASE_URL}${process.env.HOLIDAY_API_KEY}&country=ES&year=2020`)
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error("fail loading weather");
                })
                .then(responseAsJSON => {
                    console.log("aqui esta el response asjson", responseAsJSON.holidays);
                    setStore({holiday: responseAsJSON.holidays})
                })
                .catch(error => {
                    console.log(error);
                })
			}
		}
	};
};

export default getState;
