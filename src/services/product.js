import axios from "axios";
const { REACT_APP_HOST } = process.env;

export const getFavoriteHome = () => {
  const URL = `${REACT_APP_HOST}/api/products/favorite?page=1&limit=3`;
  return axios.get(URL);
};

export const getProductDetail = (id) => {
  const URL = `${REACT_APP_HOST}/api/products/detail/${id}`;
  return axios.get(URL);
};

export const getFavorite = () => {
  const URL = `${REACT_APP_HOST}/api/products/favorite?page=1&limit=12`;
  return axios.get(URL);
};

export const sortProductsByPrice = (order = "", page = 1) => {
  const URL = `${REACT_APP_HOST}/api/products?sort=price&order=${order}&page=${page}&limit=12`;
  return axios.get(URL);
};

export const getFixProducts = (
  category = "",
  search = "",
  sort = "name",
  order = "asc",
  page = 1
) => {
  const URL = `${REACT_APP_HOST}/api/products?category=${category}&name=${search}&sort=${sort}&order=${order}&page=${page}&limit=12`;
  return axios.get(URL);
};

export const editProductAxios = (id, body, token) => {
  const URL = `${REACT_APP_HOST}/api/products/${id}`;
  return axios.patch(URL, body, {
    headers: {
      "x-access-token": token,
      "content-type": "multipart/form-data",
    },
  });
};

export const createProductAxios = (body, token) => {
  const URL = `${process.env.REACT_APP_HOST}/api/products`;
  return axios.post(URL, body, {
    headers: { "Content-Type": "multipart/form-data", "x-access-token": token },
  });
};
