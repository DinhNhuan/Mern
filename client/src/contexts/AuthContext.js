import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { API_URL, LOCAL_STORAGE_TOKEN, SET_AUTH } from "../constant";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //   Authenticate  user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      const token = localStorage[LOCAL_STORAGE_TOKEN];

      setAuthToken(token);
    }
    try {
      const response = await axios(`${API_URL}/auth`);
      if (response.data.success) {
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  //   useEffect
  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //   register
  const registerUser = async (registerForm) => {
    try {
      const { username, password } = registerForm;
      const newUser = { username, password };
      const response = await axios.post(`${API_URL}/auth/register`, newUser);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //   logout
  const logoutUser = async () => {
    setAuthToken(null);
    dispatch({
      type: SET_AUTH,
      payload: { isAuthenticated: false, user: null },
    });
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  };

  // context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
