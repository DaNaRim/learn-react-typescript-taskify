import React from "react"
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd"
import {useDispatch} from "react-redux"
import {useTypedSelector} from "../../hooks/useTypedSelector"
import {moveToCompletedAction, removeFromCompletedAction} from "../../redux/todoReducer/todoActions"
import Todo from "../../redux/todoReducer/todoModel"
import {completedTodosSelector, todosSelector} from "../../redux/todoReducer/todoSelectors"
import SingleTodo from "../SingleTodo/SingleTodo"

import "./TodoList.css"

const TodoList: React.FC = () => {
    const dispatch = useDispatch()

    const todos = useTypedSelector<Todo[]>(todosSelector)
    const completedTodos = useTypedSelector<Todo[]>(completedTodosSelector)

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result

        if (!destination ||
            (destination.droppableId === source.droppableId
                && destination.index === source.index)) {
            return
        }

        if (destination.droppableId === "TodosList") {
            dispatch(removeFromCompletedAction(destination.index))
        } else if (destination.droppableId === "TodosRemove") {
            dispatch(moveToCompletedAction(destination.index))
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
                <Droppable droppableId="TodosList">
                    {(provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                             ref={provided.innerRef} {...provided.droppableProps}>

                            <span className="todos__heading">Active Task</span>
                            {todos.map((todo, index) =>
                                <SingleTodo key={todo.id} index={index} todo={todo}/>,
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="TodosRemove">
                    {(provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragremove" : ""}`}
                             ref={provided.innerRef} {...provided.droppableProps}>

                            <span className="todos__heading">Completed Task</span>
                            {completedTodos.map((todo, index) =>
                                <SingleTodo key={todo.id} index={index} todo={todo}/>,
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default TodoList