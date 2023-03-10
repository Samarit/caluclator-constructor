import { createSlice, current } from "@reduxjs/toolkit";

interface IInitialState {
  displayValue: string,
  currentResult: number,
  currentNumber: number,
  currentOperation: string | null,
  mode: string
}

const initialState: IInitialState = {
  displayValue: '0',
  currentResult: 0,
  currentNumber: 0,
  currentOperation: null,
  mode: 'value'
}


const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setDisplayValue: (state, action) => {
      state.displayValue = action.payload.toString()
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
    setMode: (state, action) => {
      state.mode = action.payload
    }
  }
})

const {reducer, actions} = runtimeSlice

export const {setCurrentResult, setCurrentNumber, setCurrentOperation, setDisplayValue, setMode} = actions
export default reducer