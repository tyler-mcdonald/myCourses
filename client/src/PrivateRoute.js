import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";

export const PrivateRoute = ({ Component, path = "/signin" }) => {
  const user = useContext(UserContext);
  return user ? <Component /> : <Navigate to={path} replace />;
};
