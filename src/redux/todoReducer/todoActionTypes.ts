import {Action} from "redux"
import Todo from "./todoModel"

enum TodoActionTypes {
    ADD_TODO = "ADD_TODO",
    EDIT_TODO = "EDIT_TODO",
    DELETE_TODO = "DELETE_TODO",
    DONE_TODO = "DONE_TODO",

    MOVE_TO_COMPLETED = "MOVE_TO_COMPLETED",
    REMOVE_FROM_COMPLETED = "REMOVE_FROM_COMPLETED",
}

export default TodoActionTypes

export type TodoAction =
    AddTodoAction
    | EditTodoAction
    | DeleteTodoAction
    | DoneTodoAction
    | MoveToCompletedAction
    | RemoveFromCompletedAction

export interface AddTodoAction extends Action {
    readonly type: TodoActionTypes.ADD_TODO,
    readonly payload: {todo: Todo}
}

export interface EditTodoAction extends Action {
    readonly type: TodoActionTypes.EDIT_TODO,
    readonly payload: {todo: Todo}
}

export interface DeleteTodoAction extends Action {
    readonly type: TodoActionTypes.DELETE_TODO,
    readonly payload: {id: number}
}

export interface DoneTodoAction extends Action {
    readonly type: TodoActionTypes.DONE_TODO,
    readonly payload: {id: number}
}

export interface MoveToCompletedAction extends Action {
    readonly type: TodoActionTypes.MOVE_TO_COMPLETED,
    readonly payload: {index: number}
}

export interface RemoveFromCompletedAction extends Action {
    readonly type: TodoActionTypes.REMOVE_FROM_COMPLETED,
    readonly payload: {index: number}
}
