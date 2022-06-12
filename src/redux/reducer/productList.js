import { getProductPagination, PENDING, FULLFILLED, REJECTED } from "../actionCreator/actionString";

const initialState = {
  data: [],
  err: null,
  isLoading: false,
  prevLink: "",
  nextLink: ""
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case getProductPagination + PENDING:
      return { ...state, isLoading: true }
    case getProductPagination + FULLFILLED:
      return { ...state, data: action.payload.value.data.data, isLoading: false, prevLink: action.payload.value.data.prevLink, nextLink: action.payload.value.data.nextLink }
    case getProductPagination + REJECTED:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default productReducer