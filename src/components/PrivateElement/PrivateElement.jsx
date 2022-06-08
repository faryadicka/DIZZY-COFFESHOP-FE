import React from "react";
import { Navigate } from "react-router-dom";

function PrivateElement({
  children,
  redirectTo = "/",
  isRouteReplace = true,
  extraData = null,
}) {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || null;
  if (!token) {
    return (
      <Navigate to={redirectTo} replace={isRouteReplace} state={extraData} />
    );
  }
  if (role === null) {
    return (
      <Navigate to={redirectTo} replace={isRouteReplace} state={extraData} />
    );
  }
  return children;
}

export default PrivateElement;
