import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const postPaymentAxios = (body, token) => {
  const URL = `${REACT_APP_HOST}/api/transactions`;
  return axios.post(URL, body, { headers: { "x-access-token": token } });
};
