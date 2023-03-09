import { useSelector } from "react-redux";
import store, { RootState } from "../../core/store/store";
import Item from "../item/Item";

export default function Constructor() {

  const constructorArea = useSelector((state: RootState) => state.sort.areas[0])
  const mode = useSelector((state: RootState) => state.mode.mode)
  
  

  return(
    <div className="constructor">
      {mode === 'constructor' &&
        constructorArea.items.map((item) => {
        return <Item id={item.id} name={item.name} area='constructor' key={item.id}/>
      })}
    </div>
  )
}