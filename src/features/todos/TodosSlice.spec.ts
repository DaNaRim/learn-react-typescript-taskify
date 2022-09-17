import todosReducer, {todoAdded, todoComplete, todoDeleted, todoMoved, todosAdapter, todoUpdated} from "./todosSlice"

describe("todos reducer", () => {
    const initialState = todosAdapter.getInitialState()

    it("should handle initial state", () => {
        expect(todosReducer(undefined, {type: "unknown"})).toEqual({
            ids: [],
            entities: {},
        })
    })

    it("should handle todoAdded", () => {
        const actual = todosReducer(initialState, todoAdded({text: "test"}))
        const id = (todosAdapter.getSelectors().selectIds(actual))[0]
        expect(actual).toEqual({
            ids: [id],
            entities: {
                [id]: {
                    id: id,
                    text: "test",
                    isCompleted: false,
                },
            },
        })
    })


    it("should handle todoAdded entity order", async () => {
        const init = todosReducer(undefined, {type: "unknown"})

        const firstTodoAdded = todosReducer(init, todoAdded({text: "test1"}))
        const id1 = firstTodoAdded.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const actual = todosReducer(firstTodoAdded, todoAdded({text: "test2"}))
        const id2 = actual.ids[0]

        expect(actual.ids).toEqual([id2, id1])

    })

    it("should handle todoUpdated", () => {
        const init = todosReducer(undefined, {type: "unknown"})
        const addTodo = todosReducer(init, todoAdded({text: "test1"}))

        const id = addTodo.ids[0]

        const actual = todosReducer(addTodo, todoUpdated({id: id, changes: {text: "test2"}}))
        expect(actual).toEqual({
            ids: [id],
            entities: {
                [id]: {
                    id: id,
                    text: "test2",
                    isCompleted: false,
                },
            },
        })
    })

    it("should handle todoDeleted", () => {
        const init = todosReducer(undefined, {type: "unknown"})
        const addTodo = todosReducer(init, todoAdded({text: "test1"}))

        const id = addTodo.ids[0]

        const actual = todosReducer(addTodo, todoDeleted(id))
        expect(actual).toEqual({
            ids: [],
            entities: {},
        })
    })

    it("should handle todoCompleted", () => {
        const init = todosReducer(undefined, {type: "unknown"})
        const addTodo = todosReducer(init, todoAdded({text: "test"}))
        const id = addTodo.ids[0]

        const actual = todosReducer(addTodo, todoComplete({id: Number(id)}))
        expect(actual).toEqual({
            ids: [id],
            entities: {
                [id]: {
                    id: id,
                    text: "test",
                    isCompleted: true,
                },
            },
        })
    })

    it("should handle todoMove in actual", async () => {
        const init = todosReducer(undefined, {type: "unknown"})

        const addTodo1 = todosReducer(init, todoAdded({text: "test"}))
        const id1 = addTodo1.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo2 = todosReducer(addTodo1, todoAdded({text: "test"}))
        const id2 = addTodo2.ids[0]

        const actual = todosReducer(addTodo2, todoMoved({id: Number(id2), newIndex: 1}))
        expect(actual.ids).toEqual([id1, id2])
    })

    it("should handle todoMove in completed", async () => {
        const init = todosReducer(undefined, {type: "unknown"})

        const addTodo1 = todosReducer(init, todoAdded({text: "test1"}))
        const id1 = addTodo1.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo2 = todosReducer(addTodo1, todoAdded({text: "test2"}))
        const id2 = addTodo2.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo3 = todosReducer(addTodo2, todoAdded({text: "test3"}))
        const id3 = addTodo3.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const complete1 = todosReducer(addTodo3, todoComplete({id: Number(id1)}))
        const complete2 = todosReducer(complete1, todoComplete({id: Number(id2)}))

        const actual = todosReducer(complete2, todoMoved({id: Number(id2), newIndex: 1}))
        expect(actual.ids).toEqual([id3, id1, id2])
    })

    it("should handle todoMove from actual to completed", async () => {
        const init = todosReducer(undefined, {type: "unknown"})

        const addTodo1 = todosReducer(init, todoAdded({text: "test1"}))
        const id1 = addTodo1.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo2 = todosReducer(addTodo1, todoAdded({text: "test2"}))
        const id2 = addTodo2.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo3 = todosReducer(addTodo2, todoAdded({text: "test3"}))
        const id3 = addTodo3.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const complete1 = todosReducer(addTodo3, todoComplete({id: Number(id1)}))
        const complete2 = todosReducer(complete1, todoComplete({id: Number(id2)}))

        const actual = todosReducer(complete2, todoMoved({id: Number(id3), newIndex: 1, isCompleteUpdated: true}))
        expect(actual.ids).toEqual([id2, id3, id1])
    })

    it("should handle todoMove from completed to actual", async () => {
        const init = todosReducer(undefined, {type: "unknown"})

        const addTodo1 = todosReducer(init, todoAdded({text: "test1"}))
        const id1 = addTodo1.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo2 = todosReducer(addTodo1, todoAdded({text: "test2"}))
        const id2 = addTodo2.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const addTodo3 = todosReducer(addTodo2, todoAdded({text: "test3"}))
        const id3 = addTodo3.ids[0]
        await new Promise(res => setTimeout(res, 2))

        const complete1 = todosReducer(addTodo3, todoComplete({id: Number(id1)}))

        const actual = todosReducer(complete1, todoMoved({id: Number(id1), newIndex: 1, isCompleteUpdated: true}))
        expect(actual.ids).toEqual([id3, id1, id2])
    })
})
