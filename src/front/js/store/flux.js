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
        actions: {},
    };
};

export default getState;
