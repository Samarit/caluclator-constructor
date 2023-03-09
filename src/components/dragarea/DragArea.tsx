import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushDroppedItem } from '../../core/reducers/constructorSlice'
import { RootState } from '../../core/store/store'
import Item from '../item/Item'

export default function DragArea() {

  const dispatch = useDispatch()

  const currentItem = useSelector((state: RootState) => state.reducer.currentItem)
  
  const dragArea = useSelector((state: RootState) => state.reducer.areas[1])

  const dragAreaRef = useRef<HTMLDivElement>(null)

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragAreaRef.current?.classList.add('active')
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dragAreaRef.current?.classList.remove('active')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragAreaRef.current?.classList.remove('active')
    dispatch(pushDroppedItem(currentItem))
  }

  return(
    <div className="dragarea" ref={dragAreaRef}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}>
        {
          dragArea.items.length > 0 
          ? dragArea.items?.map((item) => {
            return <Item id={item.id} name={item.name} key={item.id}/>
            })
          : <div key={321413453425}>DROPAREA</div>
            
        }
    </div>
  )
}