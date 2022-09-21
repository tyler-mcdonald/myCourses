import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Context } from "./Context";

export const PrivateRoute = ({ Component, path = "/signin" }) => {
  const user = useContext(Context).user;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate(path, { state: location.pathname });
  });

  return <Component />;
};
