import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateElement({
  children,
  redirectTo = "/",
  isRouteReplace = true,
  extraData = null,
  authData,
}) {
  const token = authData.token || null;
  const role = authData.role || null;
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

const mapStateToProps = (state) => {
  const {
    auth: { authData },
  } = state;
  return {
    authData,
  };
};

export default connect(mapStateToProps)(PrivateElement);
