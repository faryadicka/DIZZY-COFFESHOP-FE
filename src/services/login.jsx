import axios from "axios";

export const loginAuthService = async (body) => {
  try {
    const URL = "http://localhost:5000/api/auth/login";
    const results = await axios.post(URL, body);
    return results;
  } catch (error) {
    console.log(error);
  }
};
