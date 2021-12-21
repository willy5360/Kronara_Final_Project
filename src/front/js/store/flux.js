import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
  const PORT = 3001;
  const [PROTOCOL, HOST] = process.env.GITPOD_WORKSPACE_URL.split("://");

  return {
    store: {
      baseUrlRegister: `${PROTOCOL}://${PORT}-${HOST}/api/member/`,
      baseUrlLogin: `${PROTOCOL}://${PORT}-${HOST}/api/login/`,
      member: [],
      currentMember: {},
      holiday: [],
      currentHome: {
        id: 1,
        name: "jumbotronas",
        city: "Madrid",
      },
      weather: {},
      listHabits: [],
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
            console.log("aqui esta el response asjson", responseAsJSON.main);
            setStore({ weather: { ...responseAsJSON.main } });
          })
          .catch((error) => {
            console.log(error);
          });
      },

      getHabits: () => {
        fetch(
          "https://3001-salmon-moth-yk5yf7fo.ws-eu23.gitpod.io/api/habits",
          {
            method: "GET",
          }
        )
          .then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json();
            }
            throw new Error("Fail");
          })
          .then((responseAsJSON) => {
            console.log("aca estan tus habitos", responseAsJSON);
            setStore({
              listHabits: [...responseAsJSON],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
};

export default getState;
