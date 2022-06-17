import { getProductFavorite, getFixProductPagination, sortByPrice, nextLink, getDetail, editProduct } from "./actionString"
import { getFavorite, sortProductsByPrice, getFixProducts, getProductDetail, editProductAxios } from "../../services/product"


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

export const getProductDetailRedux = (id) => {
  return {
    type: getDetail,
    payload: getProductDetail(id)
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

export const editProductRedux = (id, body, token) => {
  return {
    type: editProduct,
    payload: editProductAxios(id, body, token)
  }
}