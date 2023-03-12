import { useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import Constructor from "./constructor/Constructor";
import DropArea from "./droparea/DropArea";
import SwitchMode from "./SwitchMode/SwitchMode";

export default function Calculator() {

  const calcMode = useSelector((state: RootState) => state.mode.mode)

  return(
    <div className={`container ${calcMode === 'constructor' ? 'mode-construction' : 'mode-runtime'}`}>
      <SwitchMode />
      <Constructor />
      <DropArea />
    </div>
  )
}