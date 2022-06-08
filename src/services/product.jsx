import axios from "axios";

export const getFavoriteHome = () => {
  const URL = "http://localhost:5000/api/products/favorite?page=1&limit=3";
  const results = axios.get(URL);
  return results;
};

export const getProductDetail = (id) => {
  const URL = `http://localhost:5000/api/products/detail/${id}`;
  const results = axios.get(URL);
  return results;
};

export const getFavorite = () => {
  const URL = `http://localhost:5000/api/products/favorite?page=1&limit=12`;
  const results = axios.get(URL);
  return results;
};

export const getProducts = (category, search, page = 1) => {
  const URL = `http://localhost:5000/api/products?category=${category}&page=${page}&limit=12&name=${search}`;
  const results = axios.get(URL);
  return results;
};
