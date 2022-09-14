import TodoActionTypes, {TodoAction} from "./todoActionTypes"
import Todo from "./todoModel"

export interface TodosState {
    todos: Todo[]
    completedTodos: Todo[]

    isInit: boolean
    loading: boolean
    error: string | null
}

const initialState: TodosState = {
    todos: [],
    completedTodos: [],

    isInit: false,
    loading: false,
    error: null,
}

const {ADD_TODO, EDIT_TODO, DELETE_TODO, DONE_TODO, MOVE_TO_COMPLETED, REMOVE_FROM_COMPLETED} = TodoActionTypes

const todoReducer = (state = initialState, action: TodoAction): TodosState => {
    const {type, payload} = action

    switch (type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, payload.todo]}
        case EDIT_TODO:
            return processEditTodo(state, payload)
        case DELETE_TODO:
            return processDeleteTodo(state, payload)
        case DONE_TODO:
            return processDoneTodo(state, payload)
        case MOVE_TO_COMPLETED: {
            const todo = state.todos[payload.index]

            if (!todo) return state

            return {
                ...state,
                todos: state.todos.filter((todo, index) => index !== payload.index),
                completedTodos: [...state.completedTodos, todo],
            }
        }
        case REMOVE_FROM_COMPLETED: {
            const todo = state.completedTodos[payload.index]

            if (!todo) return state

            return {
                ...state,
                completedTodos: state.completedTodos.filter((todo, index) => index !== payload.index),
                todos: [...state.todos, todo],
            }
        }
        default:
            return state
    }
}

export default todoReducer

function processEditTodo(state: TodosState, payload: {todo: Todo}) {
    const todoIndex = state.todos.findIndex(todo => todo.id === payload.todo.id)
    const completedTodoIndex = state.completedTodos.findIndex(todo => todo.id === payload.todo.id)

    if (todoIndex !== -1) {
        return {...state, todos: state.todos.map(todo => todo.id === payload.todo.id ? payload.todo : todo)}
    } else if (completedTodoIndex !== -1) {
        return {
            ...state, completedTodos: state.completedTodos.map(todo => todo.id === payload.todo.id
                ? payload.todo
                : todo),
        }
    } else {
        throw new Error("Edit failed: Todo not found in state")
    }
}

function processDeleteTodo(state: TodosState, payload: {id: number}) {
    const todoIndex = state.todos.findIndex(todo => todo.id === payload.id)
    const completedTodoIndex = state.completedTodos.findIndex(todo => todo.id === payload.id)

    if (todoIndex !== -1) {
        return {...state, todos: state.todos.filter(todo => todo.id !== payload.id)}
    } else if (completedTodoIndex !== -1) {
        return {...state, completedTodos: state.completedTodos.filter(todo => todo.id !== payload.id)}
    } else {
        throw new Error("Delete failed: Todo not found in state")
    }
}

function processDoneTodo(state: TodosState, payload: {id: number}) {
    const todoIndex = state.todos.findIndex(todo => todo.id === payload.id)
    const completedTodoIndex = state.completedTodos.findIndex(todo => todo.id === payload.id)

    if (todoIndex !== -1) {
        return {
            ...state,
            todos: state.todos.map(todo => todo.id === payload.id ? {...todo, isDone: !todo.isDone} : todo),
        }
    } else if (completedTodoIndex !== -1) {
        return {
            ...state,
            completedTodos: state.completedTodos.map(todo => todo.id === payload.id
                ? {...todo, isDone: !todo.isDone}
                : todo),
        }
    } else {
        throw new Error("Done failed: Todo not found in state")
    }
}