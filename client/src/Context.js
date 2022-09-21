import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { handleErrors } from "./helpers/handleErrors";
import { useLocation, useNavigate } from "react-router-dom";

export const Context = React.createContext({});

export const ContextProvider = ({ children }) => {
  const userCookie = Cookies.get("authenticatedUser");
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  /** Set user state, set cookie, and redirect */
  const handleSignIn = (user) => {
    setUser(user);
    Cookies.set("authenticatedUser", JSON.stringify(user));
    navigate(location.state || "/");
  };

  /** Remove cookie and reset user state */
  const handleSignOut = () => {
    Cookies.remove("authenticatedUser");
    setUser(null);
  };

  /** GET user request */
  const handleGetUser = async (url, authHeader) => {
    try {
      const response = await axios.get(url, authHeader);
      const password = authHeader.auth.password;
      const data = response.data;
      data.password = password;
      return data;
    } catch (err) {
      const error = handleErrors(err);
      setErrors([error.messages]);
    }
  };

  const context = {
    user,
    errors,
    actions: {
      signIn: handleSignIn,
      signOut: handleSignOut,
      getUser: handleGetUser,
    },
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
