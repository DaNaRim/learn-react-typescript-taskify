import React, {useEffect, useRef} from "react"
import {Draggable} from "react-beautiful-dnd"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import {Todo} from "../todoModel"

import "./SingleTodo.css"

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {

    const [edit, setEdit] = React.useState<boolean>(false)
    const [editTodo, setEditTodo] = React.useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setTodos(todos.map(item => item.id === id ? {...item, isDone: !item.isDone} : item))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        setTodos(todos.map(item => item.id === id ? {...item, todo: editTodo} : item))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => inputRef.current?.focus(), [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form className={`todo__single ${snapshot.isDragging ? "dragging" : ""}`}
                      onSubmit={e => handleEdit(e, todo.id)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>

                    {edit ? (
                        <input type="text" ref={inputRef} value={editTodo} onChange={e => setEditTodo(e.target.value)}/>
                    ) : todo.isDone ? (
                        <s className="todo__single__text">{todo.todo}</s>
                    ) : (
                        <span className="todo__single__text">{todo.todo}</span>
                    )}
                    <div>
                <span className="icon" onClick={() => {
                    if (!edit && !todo.isDone) setEdit(!edit)
                }}><AiFillEdit/></span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete/></span>
                        <span className="icon" onClick={() => handleDone(todo.id)}><MdDone/></span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo