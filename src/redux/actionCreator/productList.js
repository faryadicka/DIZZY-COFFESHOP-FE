import { getProductFavorite, getFixProductPagination, sortByPrice, nextLink } from "../../redux/actionCreator/actionString"
import { getFavorite, sortProductsByPrice, getFixProducts } from "../../services/product"


export const getFixProductsRedux = (category, search, sort, order, page) => {
  return {
    type: getFixProductPagination,
    payload: getFixProducts(category, search, sort, order, page)
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

export const nextLinkRedux = (category, search, sort, order, page) => {
  return {
    type: nextLink,
    payload: getFixProducts(category, search, sort, order, page)
  }
}