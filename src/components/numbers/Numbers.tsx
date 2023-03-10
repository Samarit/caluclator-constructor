import { useDispatch, useSelector } from 'react-redux'
import { setCurrentNumber, setCurrentResult, setDisplayValue, setMode } from '../../core/reducers/runtimeSlice'
import { RootState } from '../../core/store/store'
import './numbers.sass'

const numbers = [
  7, 8, 9,
  4, 5, 6,
  1, 2, 3,
  0, ','
]

export default function Numbers() {

  const dispatch = useDispatch()
  const {currentResult, currentNumber, currentOperation, mode} = useSelector((state: RootState) => state.runtime)
  const calcMode = useSelector((state: RootState) => state.mode.mode)

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    let value = target.value

    if (calcMode === 'constructor') return false

    if (mode === 'value') {
      if (value === ',') {
        dispatch(setCurrentNumber(currentNumber + '.'))
       } else if (currentResult === 0) {
          dispatch(setCurrentResult(Number(value)))
          dispatch(setDisplayValue(Number(value)))
          dispatch(setCurrentNumber(Number(value)))
        } else {
          dispatch(setCurrentNumber(currentNumber + value))
          dispatch(setDisplayValue(currentNumber + value))
        }
    }
    
    if (mode === 'total') {
      dispatch(setMode('value'))
      dispatch(setCurrentNumber(Number(value)))
      dispatch(setDisplayValue(Number(value)))
    }

    if (mode === 'count') {
      dispatch(setMode('value'))
      dispatch(setCurrentNumber(Number(value)))
      dispatch(setCurrentResult(currentNumber))
      dispatch(setDisplayValue(value))
    }
    
  }

  return(
      <div className="numbers">
        {numbers.map((number, id) => {
          return <button key={id} onClick={clickHandler} value={number}>{number}</button>
        })}
      </div>
  )
}