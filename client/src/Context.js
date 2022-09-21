import React, { useState } from "react";
import Cookies from "js-cookie";

export const Context = React.createContext({});

export const ContextProvider = ({ children }) => {
  const userCookie = Cookies.get("authenticatedUser");
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);

  const handleSignIn = (user) => {
    setUser(user);
    Cookies.set("authenticatedUser", JSON.stringify(user));
  };
  const handleSignOut = () => {
    Cookies.remove("authenticatedUser");
    setUser(null);
  };

  const context = {
    user,
    actions: { signIn: handleSignIn, signOut: handleSignOut },
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
