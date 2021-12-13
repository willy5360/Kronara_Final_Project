const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      eventURL: `${PROTOCOL}://${PORT}-${HOST}/api/event`,
      appointment: [],
      currentHome: {
        id: 1,
        name: "jumbotronas",
        city: "Madrid",
      },
      weather: {},
    },
    actions: {
      sendEvent: () => {
        fetch(getStore().eventURL, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Fail");
            }
            return response.json();
          })
          .then((responseAsJson) => {
            setStore({ appointment: [responseAsJson] });
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
