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
  const {currentResult, currentNumber, isCurrentResultFixed, mode} = useSelector((state: RootState) => state.runtime)

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    let value = target.value

    // Pressed button is ','
    if (value === ',') {
      if (mode !== 'value') return false
      if (currentNumber % 1 !== 0) return false

      if (isCurrentResultFixed) {
        dispatch(setCurrentNumber(currentNumber + '.'))
        dispatch(setDisplayValue(currentNumber + '.'))
      } else {
        dispatch(setCurrentResult(currentResult + '.'))
        dispatch(setDisplayValue(currentResult + '.'))
      }
      dispatch(setMode('point'))
      return false
    }

    // If prev button click was ','
    if (mode === 'point') {
      if (isCurrentResultFixed) {
        dispatch(setCurrentNumber(currentNumber + value))
        dispatch(setDisplayValue(currentNumber + value))
      } else {
        dispatch(setCurrentResult(currentResult + value))
        dispatch(setDisplayValue(currentResult + value))
      }
      dispatch(setMode('value'))
    }

    // In value mode 
    if (mode === 'value') {
      if (isCurrentResultFixed) {
        // Set right value
        if (currentNumber === 0) {
          dispatch(setCurrentNumber(value))
          dispatch(setDisplayValue(value))
        } else {
          dispatch(setCurrentNumber(currentNumber + value))
          dispatch(setDisplayValue(currentNumber + value))
        }
        // Set left value
      } else if (currentResult === 0) {
        dispatch(setCurrentResult(value))
        dispatch(setDisplayValue(value))
      } else {
        dispatch(setCurrentResult(currentResult + value))
        dispatch(setDisplayValue(currentResult + value))
      }
    }
    
    // If result counted and displayed
    if (mode === 'total') {
      if (isCurrentResultFixed) {
        // Set right value
        dispatch(setCurrentNumber(value))
      } else {
        // Set left value
        dispatch(setCurrentResult(value))
      }
      dispatch(setDisplayValue(value))
      dispatch(setMode('value'))
    }

    // If operator clicked -> set right value
    if (mode === 'count') {
      dispatch(setCurrentNumber(value))
      dispatch(setDisplayValue(value))
      dispatch(setMode('value'))
    }
  }

  return(
      <div className="numbers">
        {numbers.map((number, id) => {
          return <button 
                    className={`number ${number === 0 ? 'zero' : ''}`}
                    key={id} 
                    onClick={clickHandler}
                    value={number}>
                      {number}
                  </button>
        })}
      </div>
  )
}