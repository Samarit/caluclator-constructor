import { createSlice } from "@reduxjs/toolkit";

interface IInitSwitchState {
  mode: string
}

const initialState: IInitSwitchState = {
  mode: 'constructor'
}

const switchSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload
    }
  }
})

const {reducer, actions} = switchSlice

export const {setMode} = actions
export default reducer