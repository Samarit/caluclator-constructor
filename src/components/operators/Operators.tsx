import { useDispatch, useSelector } from "react-redux"
import { setCurrentNumber, setCurrentOperation, setCurrentResult, setDisplayValue, setIsCurrentResultFixed, setIsFractionAdd, setMode } from "../../core/reducers/runtimeSlice"
import { RootState } from "../../core/store/store"
import './operators.sass'

const operators = [
  {
    id: 1,
    type: 'divide',
    value: '/'
  },
  {
    id: 2,
    type: 'multiply',
    value: 'x'
  },
  {
    id: 3,
    type: 'minus',
    value: '-'
  },
  {
    id: 4,
    type: 'plus',
    value: '+'
  }
]

export default function Operators() {

  const dispatch = useDispatch()
  const {currentResult, mode} = useSelector((state: RootState) => state.runtime)

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    const operation = target.value

    // If total displayed -> use total as currentResult (left value) 
    if (mode === 'total') {
      dispatch(setCurrentResult(currentResult))
      dispatch(setCurrentNumber(0))
      dispatch(setDisplayValue(currentResult))
    }
    dispatch(setIsFractionAdd(false))
    dispatch(setMode('count'))
    dispatch(setIsCurrentResultFixed(true))
    dispatch(setCurrentOperation(operation))
  } 

  return(
      <div className="operators">
        {operators.map((operator) => 
          <button onClick={clickHandler} value={operator.type} key={operator.id}>
            {operator.value}
          </button>
        )}
      </div>
  )
}