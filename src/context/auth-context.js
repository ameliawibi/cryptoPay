import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { url } from "../utils/url";

// single source of truth,
const ActionType = {
  INITIALIZE: "INITIALIZE",
  SIGNIN: "SIGNIN",
  LOGOUT: "LOGOUT",
  REAUTH: "REAUTH",
};

const initialState = {
  isAuthenticated: false,
  user: {
    name: "",
  },
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      user,
    };
  },

  REAUTH: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      user,
    };
  },

  SIGNIN: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      user,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: {
      name: "",
    },
  }),
};

// if action.type exists, then call the handler function with the same name, else just return the current state
// we get the action.type from dispatch functions (see below)
const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  signIn: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reAuth: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      console.log("initialize ran");
      await reAuth();
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    let response = await axios.post(`${url}/auth/login`, { email, password });

    const token = response.data.token;
    localStorage.setItem("token", "Bearer " + token);
    localStorage.setItem("userId", response.data.user.id);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    if (response.status === 200) {
      dispatch({
        type: ActionType.SIGNIN,
        payload: {
          user: response.data.user,
          isAuthenticated: true,
        },
      });
    }
  };

  const reAuth = async () => {
    console.log("reAuth ran");
    try {
      let data = {
        auth: `${window.localStorage.getItem(
          "token"
        )} ${window.localStorage.getItem("userId")}`,
      };

      /*
      {
        headers: {
          Authorization: `${localStorage.getItem(
            "token"
          )} ${localStorage.getItem("userId")}`,
        },
      }
      */
      let response = await axios.post(`${url}/auth/reauth`, data);

      if (response.data.message === "Authorized!") {
        console.log(response.data.message);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            user: response.data.user,
            isAuthenticated: true,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            user: {},
            isAuthenticated: false,
          },
        });
      }
    } catch (e) {
      console.log(e);

      await logout();
    }
  };

  const logout = async () => {
    //to replace with api call later
    //await authApi.logout();
    const response = await axios.get(`${url}/auth/logout`);
    if (response.status === 200) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userId");
      //window.location.reload();
    }

    dispatch({
      type: ActionType.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logout,
        reAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
