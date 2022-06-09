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

export const getProducts = (category, search, page = 1) => {
  const URL = `${REACT_APP_HOST}/api/products?category=${category}&page=${page}&limit=12&name=${search}`;
  return axios.get(URL);
};

export const sortProductsMinPrice = (page = 1) => {
  const URL = `${REACT_APP_HOST}/api/products?sort=price&order=ASC&page=${page}&limit=12`;
  return axios.get(URL);
};

export const sortProductsMaxPrice = (page = 1) => {
  const URL = `${REACT_APP_HOST}/api/products?sort=price&order=DESC&page=${page}&limit=12`;
  return axios.get(URL);
};
