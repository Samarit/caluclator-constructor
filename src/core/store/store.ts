import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sort from '../reducers/sortConstructor'

const rootReducer = combineReducers({
    reducer: sort
})

const store = configureStore({
  reducer: rootReducer
})

export default store