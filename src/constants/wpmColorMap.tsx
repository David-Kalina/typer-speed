export const colorMap = (value: number) => {
  if (value <= 10) {
    return 'red.500'
  }
  if (value <= 20) {
    return 'red.400'
  }
  if (value <= 30) {
    return 'red.300'
  }
  if (value <= 40) {
    return 'yellow.500'
  }
  if (value <= 50) {
    return 'yellow.400'
  }
  if (value <= 60) {
    return 'yellow.300'
  }
  if (value <= 70) {
    return 'yellow.300'
  }
  if (value <= 80) {
    return 'green.300'
  }
  if (value <= 90) {
    return 'green.500'
  }
  if (value <= 100) {
    return 'green.600'
  } else {
    return 'green.700'
  }
}
