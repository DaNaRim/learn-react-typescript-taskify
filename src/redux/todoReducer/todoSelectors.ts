import {CombinedState} from "redux"
import {TodosState} from "./todoReducer"

export const todosSelector = (state: CombinedState<{todoReducer: TodosState}>) => state.todoReducer.todos
export const completedTodosSelector = (state: CombinedState<{todoReducer: TodosState}>) => state.todoReducer.completedTodos