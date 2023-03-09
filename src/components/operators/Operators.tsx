import Button from "../Button/Button"

type Operator = string

const operators = [
  '/', 'x', '+', '-'
]

export default function Operators() {
  return(
      <div className="operators">
        {operators.map((operator) => <Button operator={operator} key={operator} />)}
      </div>
  )
}