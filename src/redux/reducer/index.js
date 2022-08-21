import { combineReducers } from "redux"

import authReducer from "./auth"
import cartReducer from "./cart"
import productReducer from "./product"
import usersReducer from "./users"

const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  users: usersReducer
})

export default reducer