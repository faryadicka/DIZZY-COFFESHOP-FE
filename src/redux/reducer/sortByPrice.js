import { sortByPrice, PENDING, FULLFILLED, REJECTED } from "../actionCreator/actionString"

const initialState = {
  data: [],
  err: null,
  isLoading: false,
  prevLink: "",
  nextLink: ""
}

const sortProductByPrice = (state = initialState, action) => {
  switch (action.type) {
    case sortByPrice + PENDING:
      return { ...state, isLoading: true }
    case sortByPrice + FULLFILLED:
      return { ...state, data: action.payload.value.data.data, isLoading: false, prevLink: action.payload.value.data.prevLink, nextLink: action.payload.value.data.nextLink }
    case sortByPrice + REJECTED:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default sortProductByPrice