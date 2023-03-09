import { useDispatch, useSelector } from "react-redux"
import { setMode } from "../../core/reducers/switchSlice"
import { RootState } from "../../core/store/store"

export default function SwitchMode() {

  const dispatch = useDispatch()

  const mode = useSelector((state: RootState) => state.mode.mode)

  const toggleMode = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setMode(mode === 'constructor' ? 'runtime' : 'constructor'))
  }

  return(
    <div className="switch" onClick={toggleMode}>
      <div className="switch-toggle_constructor">Constructor</div>
      <div className="switch-toggle_runtime">Runtime</div>
    </div>
  )
}