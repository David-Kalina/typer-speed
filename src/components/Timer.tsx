import { Text } from '@chakra-ui/react'
import * as React from 'react'
import { useSocketEvent } from '../hooks/useSocketEvent'

const Timer: React.FC = () => {
  const [time, setTime] = React.useState(30)
  const [isRunning, setIsRunning] = React.useState(false)

  useSocketEvent('timerTick', time => {
    setTime(time)
    setIsRunning(true)
  })

  useSocketEvent('resetTimer', () => {
    setTime(30)
    setIsRunning(false)
  })

  if (isRunning) {
    return <Text fontSize="md">{time}</Text>
  } else {
    return null
  }
}

export default Timer
