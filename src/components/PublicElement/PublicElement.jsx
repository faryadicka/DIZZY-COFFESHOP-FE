import React from "react";
import { Navigate } from "react-router-dom";

function PublicElement({
  children,
  redirectTo = "/",
  isRouteReplace = true,
  extraData = null,
}) {
  const token = localStorage.getItem("token") || "";
  if (token) {
    return (
      <Navigate to={redirectTo} replace={isRouteReplace} state={extraData} />
    );
  }
  return children;
}

export default PublicElement;
