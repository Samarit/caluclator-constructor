export default function count(current: number | string, value: number, operator: string | null) {

  if (current === 'Не определено') return 'Не определено'
  if (operator === null) return current
  
  if (operator) {
    switch (operator) {
      case 'divide':
        return Number(value) === 0
        ? 'Не определено' 
        : Number(current) / Number(value)
      case 'multiply':
        return  Number(current) * Number(value)
      case 'plus':
        return Number(current) + Number(value)
      case 'minus': 
        return Number(current) - Number(value)
    }
  }
  
}