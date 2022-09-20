import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export const PrivateRoute = ({ Component, path = "/signin" }) => {
  const user = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate(path, { state: location.pathname });
  });

  return <Component />;
};
