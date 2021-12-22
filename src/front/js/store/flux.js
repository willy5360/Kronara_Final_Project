const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            baseURL: `${PROTOCOL}://${PORT}-${HOST}/api/`,
            currentAppointments: [],
            currentMember: {
                birth_date: "Sat, 05 May 2001 00:00:00 GMT",
                email: "gloria@jumbotrona.com",
                home_id: 1,
                id: 2,
                is_active: true,
                username: "Gloria",
            },
            member: [],
            currentHome: {
                id: 1,
                name: "jumbotronas",
                city: "Madrid",
            },
            weather: {},
            holiday: [],
        },
        actions: {
            getEvent: () => {
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member/",
                        getStore().currentMember.id,
                        "/event"
                    )
                )
                    .then((response) => {
                        console.log("aqui esta el response de event", response);
                        if (response.ok) return response.json();
                        throw new Error("fail loading events");
                    })
                    .then((responseAsJson) => {
                        setStore({
                            currentAppointments: [
                                ...getStore().currentAppointments,
                                ...responseAsJson,
                            ],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            newEvent: async (event) => {
                console.log(
                    "aqui esta el event en el flux",
                    JSON.stringify(event)
                );
                const response = await fetch(
                    getStore().baseURL.concat("home/1/member/2/event"),
                    {
                        method: "POST",
                        body: JSON.stringify(event),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const get = await getActions().getEvent();
                return true;
            },
            getMembers: () => {
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member"
                    )
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Fail");
                        }
                        return response.json();
                    })
                    .then((responseAsJson) => {
                        console.log("aqui esta el members", responseAsJson);
                        setStore({
                            member: [...getStore().member, ...responseAsJson],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getWeather: () => {
                fetch(
                    `${process.env.WEATHER_BASE_URL}q=${
                        getStore().currentHome.city
                    }&units=metric&APPID=${process.env.WEATHER_API_KEY}`
                )
                    .then((response) => {
                        if (response.ok) return response.json();
                        throw new Error("fail loading weather");
                    })
                    .then((responseAsJSON) => {
                        setStore({ weather: { ...responseAsJSON.main } });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getHoliday: () => {
                fetch(
                    `${process.env.HOLIDAY_BASE_URL}${process.env.HOLIDAY_API_KEY}&country=ES&year=2020`
                )
                    .then((response) => {
                        if (response.ok) return response.json();
                        throw new Error("fail loading Holiday");
                    })
                    .then((responseAsJSON) => {
                        setStore({ holiday: responseAsJSON.holidays });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
    };
};

export default getState;
