import { useDispatch, useSelector } from "react-redux";
import { setCurrentResult, setDisplayValue, setIsCurrentResultFixed, setIsFractionAdd, setMode } from "../../core/reducers/runtimeSlice";
import { RootState } from "../../core/store/store";
import count from "../../core/utils/count";
import "./equal.sass"

export default function Equal() {

  const dispatch = useDispatch()
  const {currentResult, currentNumber, currentOperation} = useSelector((state: RootState) => state.runtime)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    // Count total result and display it 
    const result = count(currentResult, currentNumber, currentOperation)
    
    dispatch(setCurrentResult(result))
    dispatch(setDisplayValue(result))
    dispatch(setIsCurrentResultFixed(false)) // Unfixing left value
    dispatch(setIsFractionAdd(false))
    dispatch(setMode('total'))
  }

  return(
      <div className="equal">
        <button onClick={clickHandler}>=</button>
      </div>
  )
}