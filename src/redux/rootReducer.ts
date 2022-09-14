import {combineReducers} from "redux"
import todoReducer from "./todoReducer/todoReducer"

const rootReducer = combineReducers({
    todoReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>