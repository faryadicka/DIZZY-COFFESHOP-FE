import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const loginAuthService = (body) => {
  const URL = `${REACT_APP_HOST}/api/auth/login`;
  const results = axios.post(URL, body);
  return results;
};
