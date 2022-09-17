import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit"
import todosReducer from "../features/todos/todosSlice"
import {localStorageMiddleware, reHydrateStore} from "./localStorageProvider"

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        localStorageMiddleware,
    ),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
