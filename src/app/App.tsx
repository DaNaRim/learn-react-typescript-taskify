import React from "react"
import "../App.css"
import InputField from "../common/components/InputField/InputField"
import TodoList from "../features/todos/TodoList"

const App = () => (
    <div className="App">
        <span className="heading">Taskify</span>
        <InputField/>
        <TodoList/>
    </div>
)

export default App
