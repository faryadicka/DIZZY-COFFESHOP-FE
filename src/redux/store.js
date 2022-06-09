import { applyMiddleware, legacy_createStore as createStore } from "redux"
import { createLogger } from "redux-logger"
import rpm from "redux-promise-middleware"
import reducer from "./reducer"

const logger = createLogger()
const middlewares = applyMiddleware(rpm, logger)

const store = createStore(reducer, middlewares)

export default store