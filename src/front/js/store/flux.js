const getState = ({ getStore, getActions, setStore }) => {
  const PORT = 3001;
  const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

  return {
    store: {
      baseUrl: `${PROTOCOL}://${PORT}-${HOST}/api/member/`,
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
        console.log("inicio flux", data);
        fetch(getStore().baseUrl, {
          method: "POST",
          // mode: "CORS",
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
            console.log("aqui esta respose data", responseAsJSON);
            setStore({
              member: [...getStore().member, responseAsJSON],
            });
          })
          .catch((error) => {
            console.log("soy el error de la 41", error);
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
