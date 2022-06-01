// require("dotenv").config();
import axios from "axios";
// const { HOST } = process.env;

export async function getProduct(category) {
  try {
    const URL = `http://localhost:5000/api/products?category=${category}&page=1&limit=12`;
    const result = await axios.get(URL);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getFavorite() {
  try {
    const URL = `http://localhost:5000/api/products/favorite?page=1&limit=12`;
    const results = await axios.get(URL);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct() {
  try {
    const URL = `http://localhost:5000/api/products?page=1&limit=12`;
    const results = await axios.get(URL);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearch(search) {
  try {
    const URL = `http://localhost:5000/api/products?name=${search}&page=1&limit=12`;
    const results = await axios.get(URL);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export const getFavoriteHome = async () => {
  try {
    const URL = "http://localhost:5000/api/products/favorite?page=1&limit=3";
    const results = await axios.get(URL);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = async (id) => {
  try {
    const URL = `http://localhost:5000/api/products/detail/${id}`;
    const results = await axios.get(URL);
    return results;
  } catch (error) {
    console.log(error);
  }
};
