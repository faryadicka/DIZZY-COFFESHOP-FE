import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const getProfileAxios = (token) => {
  const URL = `${REACT_APP_HOST}/api/users/profile`;
  return axios.get(URL, { headers: { "x-access-token": token } });
};

export const updateProfileAxios = (body, token) => {
  const URL = `${REACT_APP_HOST}/api/users/profile`;
  return axios.patch(URL, body, {
    headers: { "x-access-token": token, "Content-Type": "multipart/form-data" },
  });
};

export const updatePasswordAxios = (body, token) => {
  const URL = `${REACT_APP_HOST}/api/users/password`;
  return axios.patch(URL, body, {
    headers: {'x-access-token': token},
  });
};