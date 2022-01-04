import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
    const PORT = 3001;
    const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

    return {
        store: {
            baseUrlRegister: `${PROTOCOL}://${PORT}-${HOST}/api/member/`,
            baseUrlLogin: `${PROTOCOL}://${PORT}-${HOST}/api/login/`,
            baseURL: `${PROTOCOL}://${PORT}-${HOST}/api/`,
            member: [],
            currentMember: {},
            holiday: [],
            currentHome: {
                id: 1,
                name: "jumbotronas",
                city: "Madrid",
            },
            weather: {},
        },
        actions: {
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
            setCurrentMember: (member) => {
                console.log("aqui esta el member", member);
                setStore({ currentMember: member });
            },
            getHoliday: () => {
                fetch(
                    `${process.env.HOLIDAY_BASE_URL}${process.env.HOLIDAY_API_KEY}&country=ES&year=2021`
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
