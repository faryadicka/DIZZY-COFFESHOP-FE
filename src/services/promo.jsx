import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const getAllPromoAxios = (page = "1", limit = "5", token) => {
  const URL = `${REACT_APP_HOST}/api/promos?page=${page}&limit=${limit}`;
  const results = axios.get(URL, {
    headers: { "x-access-token": token },
  });
  return results;
};

export const getPromoByCouponAxios = (
  coupon,
  page = "1",
  limit = "5",
  token
) => {
  const URL = `${REACT_APP_HOST}/api/promos?coupon=${coupon}&page=${page}&limit=${limit}`;
  const results = axios.get(URL, {
    headers: { "x-access-token": token },
  });
  return results;
};

export const getPromoByIdAxios = (id, token) => {
  const URL = `${REACT_APP_HOST}/api/promos/${id}`;
  const results = axios.get(URL, {
    headers: { "x-access-token": token },
  });
  return results;
};

export const editPromoAxios = (id, token, body) => {
  const URL = `${REACT_APP_HOST}/api/promos/${id}`;
  const results = axios.patch(URL, body, {
    headers: {
      "x-access-token": token,
      "content-type": "multipart/form-data",
    },
  });
  return results;
};
