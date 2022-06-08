import axios from "axios";

export const loginAuthService = (body) => {
  const URL = "http://localhost:5000/api/auth/login";
  const results = axios.post(URL, body);
  return results;
};
