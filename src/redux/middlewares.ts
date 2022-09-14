import {applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

const middlewares = composeWithDevTools(applyMiddleware(

))

export default middlewares