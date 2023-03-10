import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushDroppedItem } from '../../core/reducers/constructorSlice'
import { RootState } from '../../core/store/store'
import Item from '../item/Item'

export default function DropArea() {

  const dispatch = useDispatch()
  const currentItem = useSelector((state: RootState) => state.sort.currentItem)
  
  const dropArea = useSelector((state: RootState) => state.sort.areas[1])

  const dropAreaRef = useRef<HTMLDivElement>(null)

  const isInDropArea = () => {
    for (let i = 0; i < dropArea.items.length; i++) {
      if (currentItem?.id === dropArea.items[i].id) 
      return true
    }
    
    return false
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropAreaRef.current?.classList.add('active')
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dropAreaRef.current?.classList.remove('active')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropAreaRef.current?.classList.remove('active')
    if (isInDropArea()) return false
    dispatch(pushDroppedItem(currentItem))
  }


  return(
    <div className="dragarea" ref={dropAreaRef}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}>
        {
          dropArea.items.length > 0 
          ? dropArea.items?.map((item) => {
            return <Item id={item.id} name={item.name} area='droparea' key={item.id}/>
            })
          : <div>DROPAREA</div>
            
        }
    </div>
  )
}