const PORT = 3001;
const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      eventURL: `${PROTOCOL}://${PORT}-${HOST}/api/`,
      appointment: [],
      currentHome: {
        id: 1,
        name: "jumbotronas",
        city: "Madrid",
      },
      weather: {},
    },
    actions: {
      getEvent: () => {
        fetch(getStore().eventURL.concat("event"), {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Fail");
            }
            return response.json();
          })
          .then((responseAsJson) => {
            console.log("aqui esta el response asjson", responseAsJson);
            setStore({
              appointment: [...getStore().appointment, responseAsJson],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      newEvent: (event) => {
        console.log("aqui esta el event en el flux", JSON.stringify(event));
        console.log(
          "aqui esta el url",
          getStore().eventURL.concat("home/1/member/2/event")
        );
        fetch(getStore().eventURL.concat("home/1/member/2/event"), {
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
              appointment: [...getStore().appointment, responseAsJson],
            });
          })
          .catch((err) => console.log(err));
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
    },
  };
};

export default getState;
