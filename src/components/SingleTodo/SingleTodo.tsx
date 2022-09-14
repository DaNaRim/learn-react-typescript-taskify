import React, {useEffect, useRef} from "react"
import {Draggable} from "react-beautiful-dnd"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {MdDone} from "react-icons/md"
import {useDispatch} from "react-redux"
import {deleteTodoAction, doneTodoAction, editTodoAction} from "../../redux/todoReducer/todoActions"

import "./SingleTodo.css"
import Todo from "../../redux/todoReducer/todoModel"

type Props = {
    index: number;
    todo: Todo;
}

const SingleTodo: React.FC<Props> = ({index, todo}) => {
    const dispatch = useDispatch()

    const [edit, setEdit] = React.useState<boolean>(false)
    const [editTodo, setEditTodo] = React.useState<string>(todo.todo)

    const handleDone = () => dispatch(doneTodoAction(todo.id))

    const handleDelete = () => dispatch(deleteTodoAction(todo.id))

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editTodoAction({...todo, todo: editTodo}))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => inputRef.current?.focus(), [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form className={`todo__single ${snapshot.isDragging ? "dragging" : ""}`}
                      onSubmit={handleEdit}
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
                        <span className="icon" onClick={handleDelete}><AiFillDelete/></span>
                        <span className="icon" onClick={handleDone}><MdDone/></span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo