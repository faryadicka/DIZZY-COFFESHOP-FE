import axios from 'axios'
const {REACT_APP_HOST} = process.env

export const registerAxios = (body) => {
  const URL = `${REACT_APP_HOST}/api/auth/register`;
  return axios.post(URL, body)
}

export const loginAxios = (body) => {
  const URL = `${REACT_APP_HOST}/api/auth/login`;
  return axios.post(URL, body)
}