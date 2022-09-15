import React, {useEffect, useRef, useState} from "react"
import {Draggable} from "react-beautiful-dnd"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {MdDone, MdOutlineClose} from "react-icons/md"
import {useDispatch} from "react-redux"
import {deleteTodoAction, doneTodoAction, editTodoAction} from "../../redux/todoReducer/todoActions"
import Todo from "../../redux/todoReducer/todoModel"

import "./SingleTodo.css"

type Props = {
    index: number;
    todo: Todo;
}

const SingleTodo: React.FC<Props> = ({index, todo}) => {
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => inputRef.current?.focus(), [isEditing])


    const handleDone = () => dispatch(doneTodoAction(todo.id))

    const handleDelete = () => dispatch(deleteTodoAction(todo.id))

    const handleEdit = () => {
        if (!isEditing && !todo.isDone) setIsEditing(!isEditing)
    }

    const handleCancelEdit = (e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        if (!isEditing) return
        if (e?.type === "keydown" && (e as React.KeyboardEvent<HTMLInputElement>).key !== "Escape") return

        setIsEditing(false)
        setEditTodo(todo.todo)
    }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
        if (!isEditing) return

        e.preventDefault()
        dispatch(editTodoAction({...todo, todo: editTodo}))
        setIsEditing(false)
    }

    const getTodoContent = () => {
        if (isEditing) {
            return <input type="text"
                          className="todo__single__text"
                          ref={inputRef}
                          value={editTodo}
                          onChange={e => setEditTodo(e.target.value)}
                          onKeyDown={e => handleCancelEdit(e)}/>
        } else if (todo.isDone) {
            return <s className="todo__single__text">{todo.todo}</s>
        } else {
            return <span className="todo__single__text">{todo.todo}</span>
        }
    }

    const getTodoButtons = () => {
        if (isEditing) {
            return (
                <div className="todo__single__buttons">
                    <span className="icon" title="confirm" onClick={handleUpdate}><MdDone/></span>
                    <span className="icon" title="cancel" onClick={handleCancelEdit}><MdOutlineClose/></span>
                </div>
            )
        } else {
            return (
                <div>
                    <span className="icon" title="edit" onClick={handleEdit}><AiFillEdit/></span>
                    <span className="icon" title="delete" onClick={handleDelete}><AiFillDelete/></span>
                    <span className="icon" title="mark as done" onClick={handleDone}><MdDone/></span>
                </div>
            )
        }
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form className={`todo__single ${snapshot.isDragging ? "dragging" : ""}`}
                      onSubmit={handleUpdate}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>

                    {getTodoContent()}
                    {getTodoButtons()}
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo
