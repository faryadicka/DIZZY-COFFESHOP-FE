import { combineReducers } from "redux"

import authReducer from "./auth"
import cartReducer from "./cart"

const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
})

export default reducer