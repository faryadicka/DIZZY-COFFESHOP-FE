import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const getAllhistories = (token) => {
  const URL = `${REACT_APP_HOST}/api/transactions?page=1&limit=12`;
  return axios.get(URL, { headers: { "x-access-token": token } });
};


export const softDeleteAxios = (token, body) => {
  const URL = `${REACT_APP_HOST}/api/transactions/soft-delete`;
  return axios.patch(URL, body, {headers: {'x-access-token': token}});
};