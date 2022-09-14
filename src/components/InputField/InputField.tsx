import React, {useRef, useState} from "react"
import {useDispatch} from "react-redux"
import {addTodoAction} from "../../redux/todoReducer/todoActions"

import "./InputField.css"

const InputField: React.FC = () => {
    const dispatch = useDispatch()

    const [todo, setTodo] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (todo) {
            dispatch(addTodoAction({id: Date.now(), todo, isDone: false}))
            setTodo("")
        }
    }

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form className="input" onSubmit={e => {
            handleSubmit(e)
            inputRef.current?.blur()
        }}>
            <input type="text"
                   className="input__box"
                   placeholder="Enter a task"
                   ref={inputRef}
                   value={todo}
                   onChange={e => setTodo(e.target.value)}/>
            <button type="submit" className="input_submit">Add</button>
        </form>
    )
}

export default InputField