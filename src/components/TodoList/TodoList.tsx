import React from "react"
import {Droppable} from "react-beautiful-dnd"
import SingleTodo from "../SingleTodo/SingleTodo"
import {Todo} from "../todoModel"

import "./TodoList.css"

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                         ref={provided.innerRef} {...provided.droppableProps}>

                        <span className="todos__heading">Active Task</span>
                        {todos.map((todo, index) =>
                            <SingleTodo key={todo.id} index={index} todo={todo} todos={todos} setTodos={setTodos}/>,
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
                            <SingleTodo key={todo.id}
                                        index={index}
                                        todo={todo}
                                        todos={todos}
                                        setTodos={setCompletedTodos}/>,
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    )
}

export default TodoList