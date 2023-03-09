import { useDispatch, useSelector } from "react-redux";
import { setCurrentItem } from "../../core/reducers/constructorSlice";
import { RootState } from "../../core/store/store";
import Equal from "../equal/Equal";
import Numbers from "../numbers/Numbers";
import Operators from "../operators/Operators";
import Result from "../result/Result";


interface IItemProps {
  id: number,
  name: string
}

export default function Item({id, name}: IItemProps) {

  const dispatch = useDispatch()

  const dropArea = useSelector((state: RootState) => state.reducer.areas[1])

  // Checks if this Item is in dropArea already
  const isInDropArea = () => {
    for (let i = 0; i < dropArea.items.length; i++) {
      if (id === dropArea.items[i].id) return true
    }
    return false
  }

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setCurrentItem({id, name}))
    console.log(isInDropArea())
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
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
    <div className="item-wrapper" style={{opacity: isInDropArea() ? '50%' : '100%'}}
      draggable={!isInDropArea()}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}>
        {setContent(name)}
    </div>
  )
}