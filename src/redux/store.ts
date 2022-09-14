import {createStore} from "redux"
import middlewares from "./middlewares"
import rootReducer from "./rootReducer"

const store = createStore(rootReducer, middlewares)

export default store