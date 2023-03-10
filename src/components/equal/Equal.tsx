import { useDispatch, useSelector } from "react-redux";
import { setCurrentResult, setDisplayValue, setMode } from "../../core/reducers/runtimeSlice";
import { RootState } from "../../core/store/store";
import count from "../../core/utils/count";

export default function Equal() {

  const dispatch = useDispatch()
  const {displayValue ,currentResult, currentNumber, currentOperation} = useSelector((state: RootState) => state.runtime)
  const calcMode = useSelector((state: RootState) => state.mode.mode)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (calcMode === 'constructor') return false

    dispatch(setCurrentResult(count(currentResult, currentNumber, currentOperation)))
    console.log('currentResult', currentResult);
    
    console.log("in equal",displayValue ,currentResult, currentNumber, currentOperation);

    dispatch(setDisplayValue(count(currentResult, currentNumber, currentOperation)))
    dispatch(setMode('total'))
    
  }

  return(
      <div className="equal">
        <button onClick={clickHandler}>=</button>
      </div>
  )
}