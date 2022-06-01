import axios from "axios";

export const getProfile = async (token) => {
  try {
    const URL = "http://localhost:5000/api/users/profile";
    const results = await axios.get(URL, token);
    return results;
  } catch (error) {
    console.log(error);
  }
};

// export const postProfile = (body) => {
//   const URL = "http://localhost:5000/api/users/profile";
//   axios.post(URL, body);
// };
