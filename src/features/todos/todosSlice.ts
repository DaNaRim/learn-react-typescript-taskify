import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export type Todo = {
    id: number;
    text: string;
    isCompleted: boolean;
}

const todosAdapter = createEntityAdapter<Todo>({
    selectId: (todo) => todo.id,
    sortComparer: (a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1
        }
        return 0
    },
})

const todosSlice = createSlice({
    name: "todos",
    initialState: todosAdapter.getInitialState(),
    reducers: {
        todoAdded: (state, action: PayloadAction<{text: string}>) => {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.text,
                isCompleted: false,
            }
            todosAdapter.setAll(state, [newTodo, ...todosAdapter.getSelectors().selectAll(state)])
        },
        todoUpdated: todosAdapter.updateOne,
        todoDeleted: todosAdapter.removeOne,
        todoComplete: (state, action: PayloadAction<{id: number}>) => {
            const todo = state.entities[String(action.payload.id)]
            if (!todo) return

            const todoIndex = state.ids.indexOf(todo.id)

            if (todo.isCompleted) {
                state.ids.splice(todoIndex, 1)
                state.ids.unshift(todo.id)
            } else {
                // @ts-ignore id always exists in state.entities
                const activeTodosIdsLength = state.ids.filter(id => !state.entities[String(id)].isCompleted).length

                state.ids.splice(todoIndex, 1)
                state.ids.splice(activeTodosIdsLength - 1, 0, todo.id)
            }
            todo.isCompleted = !todo.isCompleted
        },
        todoMoved: (state, action: PayloadAction<{
            id: number,
            oldIndex: number,
            newIndex: number,
            isCompleteUpdated?: boolean
        }>) => {
            const {id, oldIndex, newIndex, isCompleteUpdated} = action.payload

            const todo = state.entities[String(id)]

            if (!todo) return

            // @ts-ignore id always exists in state.entities
            const activeTodosIdsLength = state.ids.filter(id => !state.entities[String(id)].isCompleted).length

            if (isCompleteUpdated) {
                if (todo.isCompleted) {
                    state.ids.splice(activeTodosIdsLength + oldIndex, 1)
                    state.ids.splice(newIndex, 0, id)
                } else {
                    state.ids.splice(oldIndex, 1)
                    state.ids.splice(activeTodosIdsLength - 1 + newIndex, 0, id)
                }
                todo.isCompleted = !todo.isCompleted
            } else {
                if (todo.isCompleted) {
                    state.ids.splice(activeTodosIdsLength + oldIndex, 1)
                    state.ids.splice(activeTodosIdsLength + newIndex, 0, id)
                } else {
                    state.ids.splice(oldIndex, 1)
                    state.ids.splice(newIndex, 0, id)
                }
            }
        },
    },
})

export const {todoAdded, todoUpdated, todoDeleted, todoComplete, todoMoved} = todosSlice.actions

export const todosSelector = todosAdapter.getSelectors((state: RootState) => state.todos)

export default todosSlice.reducer
