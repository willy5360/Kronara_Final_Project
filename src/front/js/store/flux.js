const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            baseURL: `${PROTOCOL}://${PORT}-${HOST}/api/`,
            appointment: [],
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
                console.log(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member/",
                        getStore().currentMember.id,
                        "/event"
                    )
                );
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member/",
                        getStore().currentMember.id
                    ),
                    {
                        method: "GET",
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Fail");
                        }
                        return response.json();
                    })
                    .then((responseAsJson) => {
                        // console.log("aqui esta el response asjson", responseAsJson);
                        setStore({
                            appointment: [
                                ...getStore().appointment,
                                responseAsJson,
                            ],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            newEvent: (event) => {
                console.log(
                    "aqui esta el event en el flux",
                    JSON.stringify(event)
                );
                console.log(
                    "aqui esta el url",
                    getStore().baseURL.concat("home/1/member/2/event")
                );
                fetch(getStore().baseURL.concat("home/1/member/2/event"), {
                    method: "POST",
                    body: JSON.stringify(event),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        console.log("aqui esta res", res);
                        res.json();
                    })
                    .then((responseAsJson) => {
                        setStore({
                            appointment: [
                                ...getStore().appointment,
                                responseAsJson,
                            ],
                        });
                    })
                    .catch((err) => console.log(err));
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
                        console.log(
                            "aqui esta el response asjson",
                            responseAsJson
                        );
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
