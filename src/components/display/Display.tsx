import { useSelector } from "react-redux"
import { RootState } from "../../core/store/store"
import './display.sass'

export default function Display() {

  let displayValue = useSelector((state: RootState) => state.runtime.displayValue)
  
  let fontSize = '36px' // Default font-size
  

  if (displayValue.toString().length > 12 && displayValue !== 'Не определено') {
    //Format display value
    displayValue = Number(displayValue).toPrecision(8) 
    fontSize = '24px'
  } else if (displayValue.length > 8 ) {
    fontSize = '24px'
  } else if (displayValue.length > 4) {
    fontSize = '30px'
  }
  

  return(
    <div className="display-wrapper">
      <div 
        className="display"
        style={{
          fontSize: fontSize
        }}
      >
        {displayValue}
      </div>
    </div>
  )
}