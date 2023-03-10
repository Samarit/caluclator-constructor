export default function count(current: number, value: number, operator: string | null) {

  if (operator) {
    switch (operator) {
      case 'divide':
        return value === 0 ? 'Невозможно' : current / value
      case 'multiply':
        return current * value
      case 'plus':
        return current + value
      case 'minus': 
        return current - value
    }
  } else return value
  
}