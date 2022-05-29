import React from "react";
import { useParams } from "react-router-dom";

export default function withParams(Component) {
  function WithParams(props) {
    const params = useParams();
    return <Component params={params} {...props} />;
  }
  return WithParams;
}
