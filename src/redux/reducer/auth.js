import { PENDING, FULLFILLED, REJECTED, authLogin, getUser, authLogout } from "../actionCreator/actionString"

const initialState = {
  authData: {},
  userData: {},
  isLoading: false,
  err: null,
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authLogin + PENDING:
      return { ...state, isLoading: true }
    case authLogin + FULLFILLED:
      return { ...state, authData: action.payload.data.data, isLoading: false, isLoggedIn: true }
    case authLogin + REJECTED:
      return { ...state, err: action.payload, isLoading: false }

    case getUser + PENDING:
      return { ...state, isLoading: true }
    case getUser + FULLFILLED:
      return { ...state, userData: action.payload.data.data, isLoading: false }
    case getUser + REJECTED:
      return { ...state, err: action.payload, isLoading: false }

    case authLogout:
      const { token, role } = action.payload
      return { ...state, authData: { token, role } }

    default:
      return state
  }
}

export default authReducer