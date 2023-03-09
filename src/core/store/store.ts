import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sort from '../reducers/constructorSlice'
import mode from '../reducers/switchSlice'

const rootReducer = combineReducers({sort, mode})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export default store