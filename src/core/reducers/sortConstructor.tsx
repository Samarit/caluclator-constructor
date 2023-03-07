import { createSlice } from "@reduxjs/toolkit";

// Draggable item interface from constructor
interface ICalcItem {
  id: number,
  title: string,
  items: Array<{
    id: number,
    name: string
  }>
}

interface ICalcItems extends Array<ICalcItem>{}

interface IInitState {
  calcItems: ICalcItems,
  currenyItemId: number,
  currentItemOrder: number,
  currentItemZone: string
}

const initialState: IInitState = {
  calcItems: [
    {
      id: 1, 
      title: 'constructor',
      items: [
        {id: 1, name: 'result'},
        {id: 2, name: 'operators'},
        {id: 3, name: 'numbers'},
        {id: 4, name: 'equal'}
      ]
    }
  ],
  currenyItemId: 0,
  currentItemOrder: 0,
  currentItemZone: ''
}


const sortClice = createSlice({
  name: 'sort',
  initialState,
  reducers: {

  }
})

export const {reducer, actions} = sortClice

export default reducer