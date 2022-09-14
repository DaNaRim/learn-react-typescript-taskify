import React, {useRef} from "react"

import "./InputField.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <form className="input" onSubmit={e => {
            handleAdd(e)
            inputRef.current?.blur()
        }}>
            <input type="text"
                   className="input__box"
                   placeholder="Enter a task"
                   ref={inputRef}
                   value={todo}
                   onChange={e => setTodo(e.target.value)}/>
            <button type="submit" className="input_submit">Go</button>
        </form>
    )
}

export default InputField