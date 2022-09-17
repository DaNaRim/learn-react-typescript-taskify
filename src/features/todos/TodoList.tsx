import React from "react"
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import SingleTodo from "../../common/components/SingleTodo/SingleTodo"
import "./TodoList.css"
import {todoMoved, todosSelector} from "./todosSlice"

const TodoList: React.FC = () => {
    const dispatch = useAppDispatch()

    const todos = useAppSelector(todosSelector.selectAll)

    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result

        if (!destination) return

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return
        }

        if (destination.droppableId === source.droppableId) {
            dispatch(todoMoved({id: Number(draggableId), oldIndex: source.index, newIndex: destination.index}))
        } else if (
            destination.droppableId === "TodosList"
            || destination.droppableId === "TodosRemove"
        ) {
            dispatch(todoMoved({
                id: Number(draggableId),
                oldIndex: source.index,
                newIndex: destination.index,
                isCompleteUpdated: true,
            }))
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
                            {todos.filter(todo => !todo.isCompleted)
                                  .map((todo, index) =>
                                      <SingleTodo key={todo.id} index={index} todo={todo}/>,
                                  )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="TodosRemove">
                    {(provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragremove" : ""}`}
                             ref={provided.innerRef} {...provided.droppableProps}>

                            <span className="todos__heading">Completed Task</span>
                            {todos.filter(todo => todo.isCompleted)
                                  .map((todo, index) =>
                                      <SingleTodo key={todo.id} index={index} todo={todo}/>,
                                  )
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default TodoList