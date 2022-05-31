import axios from "axios";

export const getProfile = (token) => {
  const URL = "http://localhost:5000/api/users/profile";
  return axios.get(URL, token);
};

// export const postProfile = (body) => {
//   const URL = "http://localhost:5000/api/users/profile";
//   axios.post(URL, body);
// };
