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
