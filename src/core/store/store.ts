import { configureStore, combineReducers } from "@reduxjs/toolkit";
import constructor from '../reducers/constructorSlice'

const rootReducer = combineReducers({
    reducer: constructor
})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store