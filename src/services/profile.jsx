import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const getProfile = (token) => {
  const URL = `${REACT_APP_HOST}/api/users/profile`;
  const results = axios.get(URL, {
    headers: { "x-access-token": token, "Access-Control-Allow-Origin": "*" },
  });
  return results;
};
