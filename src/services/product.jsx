// require("dotenv").config();
import axios from "axios";
// const { HOST } = process.env;

export function getProduct(category) {
  const URL = `http://localhost:5000/api/products?category=${category}&page=1&limit=12`;
  return axios.get(URL);
}

export function getFavorite() {
  const URL = `http://localhost:5000/api/products/favorite?page=1&limit=12`;
  return axios.get(URL);
}

// export function getFilterAndSearch(search, category) {
//   const URL = `http://localhost:5000/api/products?name=${search}&category=${category}&page=1&limit=12`;
//   return axios.get(URL);
// }

export function getSearch(search) {
  const URL = `http://localhost:5000/api/products?name=${search}&page=1&limit=12`;
  return axios.get(URL);
}

export const getFavoriteHome = () => {
  const URL = "http://localhost:5000/api/products/favorite?page=1&limit=3";
  return axios.get(URL);
};
