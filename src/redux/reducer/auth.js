import { PENDING, FULLFILLED, REJECTED, authLogin } from "../actionCreator/actionString"

const initialState = {
  data: {},
  isLoading: false,
  err: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authLogin + PENDING:
      return { ...state, isLoading: true }
    case authLogin + FULLFILLED:
      return { ...state, data: action.payload.value.data.data, isLoading: false }
    case authLogin + REJECTED:
      return { ...state, err: action.payload, isLoading: false }
    default:
      return state
  }
}

export default authReducer