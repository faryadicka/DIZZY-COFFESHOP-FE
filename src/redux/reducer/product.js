import { sortByPrice, getProductFavorite, getFixProductPagination, PENDING, FULLFILLED, REJECTED, nextLink, getDetail, editProduct } from "../actionCreator/actionString";

const initialState = {
  products: [],
  favorite: [],
  price: [],
  detail: [],
  edit: {},
  err: null,
  isLoading: false,
  prevLink: "",
  nextLink: "",
  currentPage: 0,
  totalPage: 0
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case getFixProductPagination + PENDING:
      return { ...state, isLoading: true }
    case getFixProductPagination + FULLFILLED:
      return { ...state, products: action.payload.data.data, isLoading: false, prevLink: action.payload.data.prevLink, nextLink: action.payload.data.nextLink, currentPage: action.payload.data.currentPage, totalPage: action.payload.data.totalPage }
    case getFixProductPagination + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    case getProductFavorite + PENDING:
      return { ...state, isLoading: true }
    case getProductFavorite + FULLFILLED:
      // console.log(action.payload.data)
      return { ...state, favorite: action.payload.data.data, isLoading: false, prevLink: action.payload.data.prevLink, nextLink: action.payload.data.nextLink, currentPage: action.payload.data.currentPage }
    case getProductFavorite + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    case sortByPrice + PENDING:
      return { ...state, isLoading: true }
    case sortByPrice + FULLFILLED:
      return { ...state, price: action.payload.data.data, isLoading: false, prevLink: action.payload.data.prevLink, nextLink: action.payload.data.nextLink, currentPage: action.payload.data.currentPage, totalPage: action.payload.data.totalPage }
    case sortByPrice + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    case nextLink + PENDING:
      return { ...state, isLoading: true }
    case nextLink + FULLFILLED:
      return { ...state, products: action.payload.data.data, isLoading: false, prevLink: action.payload.data.prevLink, nextLink: action.payload.data.nextLink, currentPage: action.payload.data.currentPage, totalPage: action.payload.data.totalPage }
    case nextLink + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    case getDetail + PENDING:
      return { ...state, isLoading: true }
    case getDetail + FULLFILLED:
      return { ...state, detail: action.payload.data.data, isLoading: false }
    case getDetail + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    case editProduct + PENDING:
      return { ...state, isLoading: true }
    case editProduct + FULLFILLED:
      console.log(action.payload.data)
      return { ...state, edit: action.payload.data.data, isLoading: false }
    case editProduct + REJECTED:
      return { ...state, isLoading: false, err: action.payload }

    default:
      return state
  }
}

export default productReducer