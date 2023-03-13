import { useDispatch, useSelector } from "react-redux";
import { deleteItem, IItem, setCurrentItem, setCurrentItemPosition } from "../../core/reducers/constructorSlice";
import { RootState } from "../../core/store/store";
import Equal from "../equal/Equal";
import Numbers from "../numbers/Numbers";
import Operators from "../operators/Operators";
import Display from "../display/Display";
import './item.sass'


interface IItemProps extends IItem {
  area: string
}

export default function Item({id, name, area}: IItemProps) {

  const dispatch = useDispatch()
  const droparea = useSelector((state: RootState) => state.sort.areas[1])
  const {currentItem} = useSelector((state: RootState) => state.sort)
  const calcMode = useSelector((state: RootState) => state.mode.mode)
  
  // Check is Item in dropArea already
  const isInDropArea = () => {
    for (let i = 0; i < droparea.items.length; i++) {
      if (id === droparea.items[i].id) 
      return true
    }
    return false
  }
  
  // Checks if item can be interacted
  const isActive = () => (area === 'constructor' && !isInDropArea()) || area ==='droparea'
  
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setCurrentItem({id, name}))
    // Delete on dbclick
    if (e.detail === 2 && calcMode === 'constructor' && isActive()) {
      dispatch(deleteItem(currentItem))
    }
  }

  const isDraggable = () => {
    if (name === 'display' && isInDropArea() ) return false
    if ( !isActive() ) return false
    return true
  }

  // DragEvents below
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setCurrentItem({id, name}))
  }

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
    if (name === 'display') {
      dispatch(setCurrentItemPosition(1)) 
    } else {
      // Find entered element by matching with item we drag and return index of this element
      dispatch(setCurrentItemPosition(droparea.items.findIndex((el) => el.id === id && el.name === name) + 1))
    }
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
  }

  // Return required component
  const setContent = (name: string) => {
    switch (name) {
      case 'display':
        return <Display />
      case 'operators':
        return <Operators />
      case 'numbers':
        return <Numbers />
      case 'equal':
        return <Equal />
      default:
        break;
    }
  }

  return(
    <div className="item-wrapper" 
      style={{
        opacity: isActive() ? '100%' : '50%'
      }}
      onClick={clickHandler}
      draggable={ isDraggable() }
      onDragStart={dragStartHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragEnd={dragEndHandler}
      onDrop={dropHandler}>
        {setContent(name)}
    </div>
  )
}