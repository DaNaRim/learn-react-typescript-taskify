import {Middleware} from "redux"

const STORAGE_KEY = "applicationState"

export const localStorageMiddleware: Middleware = ({getState}) => next => action => {
    const result = next(action)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()))
    return result
}

export const reHydrateStore = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")