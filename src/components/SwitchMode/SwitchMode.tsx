import { useDispatch, useSelector } from "react-redux"
import { clearDropArea } from "../../core/reducers/constructorSlice"
import { setMode } from "../../core/reducers/switchSlice"
import { RootState } from "../../core/store/store"
import { motion } from 'framer-motion';
import "./switchMode.sass"
import { resetRuntimeState } from "../../core/reducers/runtimeSlice";
import {ReactComponent as EyeSVG} from '../../assets/icons/eye.svg'
import {ReactComponent as ConstructorSVG} from '../../assets/icons/constructor.svg'

const spring = { // Switcher aniimation theme
  type: "spring",
  stiffness: 700,
  damping: 50
};

export default function SwitchMode() {

  const dispatch = useDispatch()

  const mode = useSelector((state: RootState) => state.mode.mode)

  const toggleMode = (e: React.MouseEvent<HTMLDivElement>) => {
    //Toggling from runtime to constructor -> clear & reset
    if (mode === 'runtime') {
      dispatch(resetRuntimeState())
      dispatch(clearDropArea([]))
    }
    dispatch(setMode(mode === 'constructor' ? 'runtime' : 'constructor'))
  }

  return(
    <div className="switch-wrapper">
      <div data-handle={mode} className="switch" onClick={toggleMode}>
        <motion.div data-handle={mode}  className='switch__handle' layout transition={spring}></motion.div>
        <div className="switch__left-item">
          <EyeSVG />
            Runtime
        </div>
        <div className="switch__right-item">
          <ConstructorSVG />
          Constructor
        </div>
      </div>
    </div>
  )
}