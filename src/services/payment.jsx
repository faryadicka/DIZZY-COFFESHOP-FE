import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const postPayment = (body, token) => {
  const URL = `${REACT_APP_HOST}/api/transactions`;
  const results = axios.post(URL, body, token);
  return results;
};
