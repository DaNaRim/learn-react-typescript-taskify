import {useReducer} from "react"

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

type Action =
    {type: "ADD", payload: string}
    | {type: "REMOVE", payload: number}
    | {type: "DONE", payload: number}

const TodoReducer = (state: Todo[], action: Action) => {
    const {type, payload} = action

    switch (type) {
        case "ADD":
            return [...state, {id: Date.now(), todo: payload, isDone: false}]
        case "REMOVE":
            return state.filter(todo => todo.id !== payload)
        case "DONE":
            return state.map(todo => todo.id === payload ? {...todo, isDone: !todo.isDone} : todo)
        default:
            return state
    }
}


const TodoEx = () => {

    const [state, dispatch] = useReducer(TodoReducer, [])

    // return (
    //     <div>
    //
    //         </div>
    // )
}