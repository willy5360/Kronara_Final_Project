import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
    let backend_url = "";

    if (process.env.GITPOD_WORKSPACE_URL) {
        const PORT = 3001;
        const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");
        backend_url = `${PROTOCOL}://${PORT}-${HOST}`;
    } else {
        backend_url = process.env.BACKEND_URL;
    }

    return {
        store: {
            baseUrlRegister: `${backend_url}/api/member/`,
            baseUrlLogin: `${backend_url}/api/login/`,
            list: [],
            baseURL: `${backend_url}/api/`,
            member: [],
            currentMember: {},
            holiday: [],
            currentHome: {
                // id: 1,
                // name: "Jumbotrona",
                // city: "Madrid",
            },

            weather: {},
            listHabits: [],
            currentAppointments: [],
        },
        actions: {
            getTask: () => {
                // console.log("aqui esta la casa", getStore().currentHome.id);
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/task"
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
                    .then((responseAsJason) => {
                        setStore({ list: [...responseAsJason] });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteTask: (indexList) => {
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/task/",
                        indexList
                    ),
                    {
                        method: "DELETE",
                    }
                )
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
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/task"
                    ),
                    {
                        method: "POST",
                        body: JSON.stringify(item),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
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
                        console.log("soy el error de la 41", error);
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
                        console.log("aqui esta el token.sub", token.sub);
                        setStore({
                            currentMember: token.sub,
                        });
                        console.log(
                            "aqui esta el currentMember",
                            getStore().currentMember
                        );

                        localStorage.setItem(
                            "acces_token",
                            JSON.stringify(responseAsJSON.token)
                        );
                        getActions().getHome();
                        // getActions().getTask();
                        // getActions().getEvent();
                        console.log("login ready", token);
                    })
                    .catch((error) => {
                        console.log(error);
                        localStorage.removeItem("access_token");
                    });
            },
            getHome: () => {
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentMember.home_id
                    )
                )
                    .then((response) => {
                        if (response.ok) return response.json();
                        throw new Error("fail loading home");
                    })
                    .then((responseAsJSON) => {
                        setStore({
                            currentHome: responseAsJSON,
                        });
                        console.log(
                            "current home en gethome",
                            getStore().currentHome
                        );
                    })
                    .catch((error) => {
                        console.log(error);
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
                            member: responseAsJson,
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
                getActions().getEvent();
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
            getHabits: () => {
                fetch(getStore().baseURL.concat("habits"), {
                    method: "GET",
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error("Fail");
                    })
                    .then((responseAsJSON) => {
                        setStore({
                            listHabits: [...responseAsJSON],
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
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member/",
                        getStore().currentMember.id,
                        "/event"
                    ),
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
                        if (response.ok) return response.json();
                        throw new Error("fail loading events");
                    })
                    .then((responseAsJson) => {
                        setStore({
                            currentAppointments: [...responseAsJson],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteEvent: (indexEvent) => {
                fetch(
                    getStore().baseURL.concat(
                        "home/",
                        getStore().currentHome.id,
                        "/member/",
                        getStore().currentMember.id,
                        "/event/",
                        indexEvent
                    ),
                    {
                        method: "DELETE",
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Fail");
                        }
                        return response.json();
                    })
                    .then((responseAsJason) => {
                        return setStore({
                            currentAppointments: responseAsJason,
                        });
                    })
                    .catch((err) => console.log(err));
            },
        },
    };
};

export default getState;
