import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, pushDroppedItem } from '../../core/reducers/constructorSlice'
import { RootState } from '../../core/store/store'
import Item from '../item/Item'
import {ReactComponent as DrophereSVG} from '../../assets/icons/drophere.svg'
import './droparea.sass'

export default function DropArea() {

  const dispatch = useDispatch()
  const {currentItem, currentItemPosition} = useSelector((state: RootState) => state.sort)
  const dropArea = useSelector((state: RootState) => state.sort.areas[1])

  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Check if this Item component in droparea
  const isInDropArea = () => {
    for (let i = 0; i < dropArea.items.length; i++) {
      if (currentItem?.id === dropArea.items[i].id) 
      return true
    }
    return false
  }

  const isEmpty = () => dropArea.items.length === 0

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dropArea.items.length === 0) dropAreaRef.current?.classList.add('active')
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dropAreaRef.current?.classList.remove('active')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropAreaRef.current?.classList.remove('active')
    if (isInDropArea()) dispatch(deleteItem(currentItem))
    dispatch(pushDroppedItem({currentItem, currentItemPosition}))
  }


  return(
    <div className="area">
      <div className={`droparea ${isEmpty() ? 'empty': ''}`} ref={dropAreaRef}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}>
          {
            dropArea.items.length > 0 
            ? dropArea.items?.map((item) => {
              return <Item id={item.id} name={item.name} area='droparea' key={item.id}/>
              })
            : 
            <DrophereSVG />
              
          }
      </div>
    </div>
  )
}