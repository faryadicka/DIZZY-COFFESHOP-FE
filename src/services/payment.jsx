import axios from "axios";

export const postPayment = (body, token) => {
  const URL = "http://localhost:5000/api/transactions";
  const results = axios.post(URL, body, token);
  return results;
};
