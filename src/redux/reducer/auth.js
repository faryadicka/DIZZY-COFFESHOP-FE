import { PENDING, FULLFILLED, REJECTED, authLogin, getUser } from "../actionCreator/actionString"

const initialState = {
  authData: {},
  userData: {},
  isLoading: false,
  err: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authLogin + PENDING:
      return { ...state, isLoading: true }
    case authLogin + FULLFILLED:
      console.log(action.payload.data.data)
      return { ...state, authData: action.payload.data.data, isLoading: false }
    case authLogin + REJECTED:
      return { ...state, err: action.payload, isLoading: false }

    case getUser + PENDING:
      return { ...state, isLoading: true }
    case getUser + FULLFILLED:
      console.log(action.payload.data.data)
      return { ...state, userData: action.payload.data.data, isLoading: false }
    case getUser + REJECTED:
      return { ...state, err: action.payload, isLoading: false }

    default:
      return state
  }
}

export default authReducer