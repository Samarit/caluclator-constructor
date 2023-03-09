import { createSlice } from "@reduxjs/toolkit";

// Draggable item
type Item = {
  id: number,
  name: string
} 
// Areas with items
interface IArea {
  id: number,
  title: string,
  items: Item[]
}

interface IAreas extends Array<IArea>{}

interface IInitState {
  areas: IAreas,
  currentItem: Item | {},
  currentItemOrder: number,
  currentItemZone: string
}

const initialState: IInitState = {
  areas: [
    {
      id: 1, 
      title: 'constructor',
      items: [
        {id: 1, name: 'result'},
        {id: 2, name: 'operators'},
        {id: 3, name: 'numbers'},
        {id: 4, name: 'equal'}
      ]
    },
    {
      id: 2,
      title: 'droparea',
      items: []
    }
  ],
  currentItem: {},
  currentItemOrder: 0,
  currentItemZone: ''
}


const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
    pushDroppedItem: (state, action) => {
      // Push item to droparea, 'result' item push to start
      if (action.payload.name === 'result') {
        state.areas[1].items.unshift(action.payload)
      } else state.areas[1].items.push(action.payload)
    }
  }
})

export const {reducer, actions} = constructorSlice
export const {setCurrentItem, pushDroppedItem} = actions

export default reducer