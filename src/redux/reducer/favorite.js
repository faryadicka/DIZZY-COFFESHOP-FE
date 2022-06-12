import { getProductFavorite, PENDING, FULLFILLED, REJECTED } from "../actionCreator/actionString";

const initialState = {
  data: [],
  err: null,
  isLoading: false,
  prevLink: "",
  nextLink: ""
}

const productFavorite = (state = initialState, action) => {
  switch (action.type) {
    case getProductFavorite + PENDING:
      return { ...state, isLoading: true }
    case getProductFavorite + FULLFILLED:
      return { ...state, data: action.payload.value.data.data, isLoading: false, prevLink: action.payload.value.data.prevLink, nextLink: action.payload.value.data.nextLink }
    case getProductFavorite + REJECTED:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default productFavorite