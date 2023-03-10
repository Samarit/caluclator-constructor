import { useSelector } from "react-redux"
import { RootState } from "../../core/store/store"

export default function Result() {

  const displayValue = useSelector((state: RootState) => state.runtime.displayValue)

  return(
      <div className="result">{displayValue}</div>
  )
}