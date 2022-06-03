import axios from "axios";

export const getAllhistories = (token) => {
  const URL = "http://localhost:5000/api/transactions?page=1&limit=12";
  return axios.get(URL, { headers: { "x-access-token": token } });
};
