import React from "react";
import { useLocation } from "react-router-dom";

export default function withLocation(Component) {
  function Location(props) {
    const location = useLocation();
    return <Component location={location} {...props} />;
  }
  return Location;
}
