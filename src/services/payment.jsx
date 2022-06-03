import axios from "axios";

export const postPayment = async (body, token) => {
  try {
    const URL = "http://localhost:5000/api/transactions";
    const results = await axios.post(URL, body, token);
    return results;
  } catch (error) {
    console.log(error);
  }
};
