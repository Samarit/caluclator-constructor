type ButtonProps = {
  operator: string
}

export default function Button({operator}: ButtonProps) {
  return(
    <button>{operator}</button>
  )
}