import { log } from "console";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, setCurrentItem } from "../../core/reducers/constructorSlice";
import { RootState } from "../../core/store/store";
import Equal from "../equal/Equal";
import Numbers from "../numbers/Numbers";
import Operators from "../operators/Operators";
import Result from "../result/Result";


interface IItemProps {
  id: number,
  name: string,
  area: string
}

export default function Item({id, name, area}: IItemProps) {

  const dispatch = useDispatch()

  const droparea = useSelector((state: RootState) => state.sort.areas[1])
  const currentItem = useSelector((state: RootState) => state.sort.currentItem)

  const isInDropArea = () => {
    for (let i = 0; i < droparea.items.length; i++) {
      if (id === droparea.items[i].id) 
      return true
    }
    
    return false
  }

  const isDraggable = () => (area === 'constructor' && !isInDropArea()) || area ==='droparea'

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setCurrentItem({id, name}))
    console.log(isDraggable())
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
  }

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setCurrentItem({id, name}))
    // Delete on dbclick
    if (e.detail === 2) dispatch(deleteItem(currentItem))
  }

  const setContent = (name: string) => {
    switch (name) {
      case 'result':
        return <Result />
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
        opacity: isDraggable() ? '100%' : '50%'
      }}
      onClick={clickHandler}
      draggable={isDraggable()}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}>
        {setContent(name)}
    </div>
  )
}