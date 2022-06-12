import { combineReducers } from "redux"

import authReducer from "./auth"
import cartReducer from "./cart"
import productReducer from "./productList"
import favoriteReducer from "./favorite"
import sortPriceReducer from "./sortByPrice"

const reducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  favorite: favoriteReducer,
  sortPrice: sortPriceReducer
})

export default reducer