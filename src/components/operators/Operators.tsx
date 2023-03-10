import { useDispatch, useSelector } from "react-redux"
import { setCurrentOperation, setCurrentResult, setMode } from "../../core/reducers/runtimeSlice"
import { RootState } from "../../core/store/store"

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
  const {currentResult, currentNumber, mode} = useSelector((state: RootState) => state.runtime)
  const calcMode = useSelector((state: RootState) => state.mode.mode)

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement

    if (calcMode === 'constructor') return false

    if (mode === 'total') dispatch(setCurrentResult(currentResult))
    console.log(currentResult, currentNumber);
    
    
    dispatch(setMode('count'))
    dispatch(setCurrentOperation(target.value))
  } 

  return(
      <div className="operators">
        {operators.map((operator) => 
          <button onClick={clickHandler} value={operator.type} key={operator.id}>{operator.value}</button>
        )}
      </div>
  )
}