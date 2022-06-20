import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function PublicElement({
  children,
  redirectTo = "/",
  isRouteReplace = true,
  extraData = null,
  authData,
}) {
  const token = authData.token || "";
  if (token) {
    return (
      <Navigate to={redirectTo} replace={isRouteReplace} state={extraData} />
    );
  }
  return children;
}

const mapStateToProps = (state) => {
  const {
    auth: { authData },
  } = state;
  return {
    authData,
  };
};

export default connect(mapStateToProps)(PublicElement);
