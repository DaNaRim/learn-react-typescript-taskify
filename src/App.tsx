import React from "react"
import "./App.css"
import InputField from "./components/InputField/InputField"
import TodoList from "./components/TodoList/TodoList"

const App: React.FC = () => {
    return (
        <div className="App">
            <span className="heading">Taskify</span>
            <InputField/>
            <TodoList/>
        </div>
    )
}

export default App
