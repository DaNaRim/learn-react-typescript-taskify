import TodoActionTypes, {
    AddTodoAction,
    DeleteTodoAction,
    DoneTodoAction,
    EditTodoAction,
    MoveToCompletedAction,
    RemoveFromCompletedAction,
} from "./todoActionTypes"
import Todo from "./todoModel"

export const addTodoAction = (todo: Todo): AddTodoAction => ({type: TodoActionTypes.ADD_TODO, payload: {todo}})
export const editTodoAction = (todo: Todo): EditTodoAction => ({type: TodoActionTypes.EDIT_TODO, payload: {todo}})
export const deleteTodoAction = (id: number): DeleteTodoAction => ({type: TodoActionTypes.DELETE_TODO, payload: {id}})

export const doneTodoAction = (id: number): DoneTodoAction => ({type: TodoActionTypes.DONE_TODO, payload: {id}})

export const moveToCompletedAction = (index: number): MoveToCompletedAction => ({
    type: TodoActionTypes.MOVE_TO_COMPLETED,
    payload: {index},
})

export const removeFromCompletedAction = (index: number): RemoveFromCompletedAction => ({
    type: TodoActionTypes.REMOVE_FROM_COMPLETED,
    payload: {index},
})
