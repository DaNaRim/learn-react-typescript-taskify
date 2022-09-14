import React, {useState} from "react"
import {DragDropContext, DropResult} from "react-beautiful-dnd"
import "./App.css"
import InputField from "./components/InputField/InputField"
import TodoList from "./components/TodoList/TodoList"
import {Todo} from "./components/todoModel"

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<Todo[]>([])
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (todo) {
            const newTodo = {
                id: Date.now(),
                todo,
                isDone: false,
            }
            setTodos([...todos, newTodo])
            setTodo("")
        }
    }

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result

        if (!destination) return

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return
        }

        if (source.droppableId === "TodosList") {
            const todo0 = todos[source.index]

            const newTodos = [...todos].filter((todo, index) => index !== source.index)
            const newCompletedTodos = [...completedTodos, todo0]

            setTodos(newTodos)
            setCompletedTodos(newCompletedTodos)
        } else if (source.droppableId === "TodosRemove") {
            const todo0 = completedTodos[source.index]

            const newCompletedTodos = [...completedTodos].filter((todo, index) => index !== source.index)
            const newTodos = [...todos, todo0]
            setCompletedTodos(newCompletedTodos)
            setTodos(newTodos)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Taskify</span>

                <InputField todo={todo} setTodo={setTodo} handleAdd={handleSubmit}/>

                <TodoList todos={todos}
                          setTodos={setTodos}
                          completedTodos={completedTodos}
                          setCompletedTodos={setCompletedTodos}/>
            </div>
        </DragDropContext>
    )
}

export default App
