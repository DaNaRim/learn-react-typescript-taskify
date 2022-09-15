import {createStore} from "redux"
import {reHydrateStore} from "./localStorageProvider"
import middlewares from "./middlewares"
import rootReducer from "./rootReducer"

const store = createStore(rootReducer, reHydrateStore(), middlewares)

export default store