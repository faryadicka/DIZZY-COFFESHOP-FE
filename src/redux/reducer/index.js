import { combineReducers } from "redux"

import authReducer from "./auth"
import cartReducer from "./cart"
import productReducer from "./product"

const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
})

export default reducer