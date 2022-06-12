import { getProductPagination, getProductFavorite, sortByPrice } from "../../redux/actionCreator/actionString"
import { getProducts, getFavorite, sortProductsByPrice } from "../../services/product"

export const getProductsRedux = (category, search, page) => {
  return {
    type: getProductPagination,
    payload: getProducts(category, search, page)
  }
}

export const getFavoriteRedux = () => {
  return {
    type: getProductFavorite,
    payload: getFavorite()
  }
}

export const sortByPriceRedux = (order) => {
  return {
    type: sortByPrice,
    payload: sortProductsByPrice(order)
  }
}

export const nextLinkRedux = (order, page) => {
  return {
    type: "NEXT_GET_PRODUCTS",
    payload: sortProductsByPrice(order, page)
  }
}