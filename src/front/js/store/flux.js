import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
    const PORT = 3001;
    const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

    return {
        store: {
            baseUrlRegister: `${PROTOCOL}://${PORT}-${HOST}/api/member/`,
            baseUrlLogin: `${PROTOCOL}://${PORT}-${HOST}/api/login/`,
            URL: `${PROTOCOL}://${PORT}-${HOST}/api/task/`,
            list: [],
            currentHome: {
                id: 1,
                name: "jumbotronas",
                city: "Madrid",
            },

            member: [],
            currentMember: {},
            holiday: [],
            weather: {},
        },
        actions: {
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
                        console.log(
                            "aqui esta el response asjson",
                            responseAsJSON.main
                        );
                        setStore({ weather: { ...responseAsJSON.main } });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getTask: () => {
                fetch(getStore().URL, {
                    method: "GET",
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Fail");
                        }
                        return response.json();
                    })
                    .then((responseAsJason) => {
                        setStore({ list: [...responseAsJason] });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteTask: (indexList) => {
                fetch(getStore().URL.concat(indexList), { method: "DELETE" })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Fail");
                        }
                        return response.json();
                    })
                    .then((responseAsJason) => {
                        return setStore({ list: responseAsJason });
                    })
                    .catch((err) => console.log(err));
            },
            submitTask: (item) => {
                fetch(getStore().URL, {
                    method: "POST",
                    body: JSON.stringify(item),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((responseAsJason) => {
                        setStore({
                            list: [...getStore().list, responseAsJason],
                        });
                    })
                    .catch((err) => console.log(err));
            },
            register: (data) => {
                console.log("inicio flux", data);

                fetch(getStore().baseUrlRegister, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error("fail getting data");
                    })
                    .then((responseAsJSON) => {
                        setStore({
                            member: [...getStore().member, responseAsJSON],
                        });
                    })
                    .catch((error) => {
                        // console.log("soy el error de la 41", error);
                    });
            },
            login: (data) => {
                fetch(getStore().baseUrlLogin, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (response.ok) return response.json();
                        throw new Error("fail sending login");
                    })
                    .then((responseAsJSON) => {
                        let token = jwt_decode(responseAsJSON.token);
                        setStore({
                            currentMember: token.sub,
                        });
                        localStorage.setItem(
                            "acces_token",
                            JSON.stringify(responseAsJSON.token)
                        );
                        console.log("login ready", token);
                    })
                    .catch((error) => {
                        console.log(error);
                        localStorage.removeItem("access_token");
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
                        console.log(
                            "aqui esta el response asjson",
                            responseAsJSON.main
                        );
                        setStore({ weather: { ...responseAsJSON.main } });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
    };
};

export default getState;
