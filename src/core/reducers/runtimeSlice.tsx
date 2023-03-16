import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  displayValue: string,
  currentResult: number, // Left value
  currentNumber: number, // Right value
  currentOperation: string | null,
  isCurrentResultFixed: boolean, // For checking what value we set
  isFractionAdd: boolean, // Checks if we adding a fraction part of number
  mode: string // For checking previous actions
}

const initialState: IInitialState = {
  displayValue: '0',
  currentResult: 0, 
  currentNumber: 0, 
  currentOperation: null,
  isCurrentResultFixed: false, 
  isFractionAdd: false,
  mode: 'value'
}


const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setDisplayValue: (state, action) => {
      state.displayValue = action.payload
    },
    // 
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload
    },
    setCurrentNumber: (state, action) => {
      state.currentNumber = action.payload
    },
    setCurrentOperation: (state, action) => {
      state.currentOperation = action.payload
    },
    setIsCurrentResultFixed: (state, action) => {
      state.isCurrentResultFixed = action.payload
    },
    setIsFractionAdd: (state, action) => {
      state.isFractionAdd = action.payload
    },
    setMode: (state, action) => {
      state.mode = action.payload
    },
    resetRuntimeState: () => initialState
  }
})

const {reducer, actions} = runtimeSlice

export const {setCurrentResult, setCurrentNumber, setCurrentOperation, setDisplayValue, setIsCurrentResultFixed, setIsFractionAdd, setMode, resetRuntimeState} = actions
export default reducer