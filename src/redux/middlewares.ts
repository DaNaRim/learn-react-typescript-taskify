import {applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {localStorageMiddleware} from "./localStorageProvider"

const middlewares = composeWithDevTools(applyMiddleware(
    localStorageMiddleware,
))

export default middlewares