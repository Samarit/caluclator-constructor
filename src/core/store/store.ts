import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sort from '../reducers/constructorSlice'
import runtime from '../reducers/runtimeSlice'
import mode from '../reducers/switchSlice'

const rootReducer = combineReducers({sort, runtime, mode})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store