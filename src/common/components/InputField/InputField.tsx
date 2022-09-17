import React, {useRef, useState} from "react"
import {useAppDispatch} from "../../../app/hooks"
import {todoAdded} from "../../../features/todos/todosSlice"

import "./InputField.css"

const InputField: React.FC = () => {
    const dispatch = useAppDispatch()

    const [todoText, setTodoText] = useState<string>("")

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (todoText) {
            dispatch(todoAdded({text: todoText}))
            setTodoText("")
        }
        inputRef.current?.blur()
    }

    return (
        <form className="input" onSubmit={handleSubmit}>
            <input type="text"
                   className="input__box"
                   placeholder="Enter a task"
                   ref={inputRef}
                   value={todoText}
                   onChange={e => setTodoText(e.target.value)}
            />
            <button type="submit" className="input_submit">Add</button>
        </form>
    )
}

export default InputField