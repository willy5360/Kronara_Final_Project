const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      baseUrl: `${PROTOCOL}://${PORT}-${HOST}/api/`,
      currentMembers: [],
      member: [],
      currentHome: {
        id: 1,
        name: "jumbotronas",
        city: "Madrid",
      },
      weather: {},
    },
    actions: {
      register: (data) => {
        fetch(getStore().baseUrl.concat("member/"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("fail getting data");
          })
          .then((responseAsJSON) => {
            console.log(responseAsJSON.results);
            setStore({
              currentMembers: [...getStore().member, ...responseAsJSON.data],
            });
          })
          .catch((error) => {
            console.log(error);
            console.log(getStore().baseUrl.concat("member/"));
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
            console.log("aqui esta el response asjson", responseAsJSON.main);
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
