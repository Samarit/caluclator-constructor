import { useSelector } from "react-redux";
import store, { RootState } from "../../core/store/store";
import Item from "../item/Item";

export default function Constructor() {

  const constructorArea = useSelector((state: RootState) => state.reducer.areas[0])
  
  

  return(
    <div className="constructor">
      {constructorArea.items.map((item) => {
        return <Item id={item.id} name={item.name} key={item.id}/>
      })}
    </div>
  )
}