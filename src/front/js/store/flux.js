const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            baseURL: `${PROTOCOL}://${PORT}-${HOST}/api/`,
            currentHome: {
                id: 1,
                name: "jumbotronas",
                city: "Madrid",
            },
            currentMember: {
                birth_date: "Sat, 05 May 2001 00:00:00 GMT",
                email: "gloria@jumbotrona.com",
                home_id: 1,
                id: 2,
                is_active: true,
                username: "Gloria",
            },
            member: [],
            weather: {},
        },
        actions: {
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
                console.log(
                    "aqui el set store de member",
                    getStore().currentMember
                );
            },
        },
    };
};

export default getState;
