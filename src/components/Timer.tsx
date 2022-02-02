import * as React from 'react'
import { Text } from '@chakra-ui/react'
import { socket } from '../contexts/SocketContext'

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [time, setTime] = React.useState(60)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    socket.on('timerTick', time => {
      setTime(time)
      setIsRunning(true)
    })
  }, [])

  React.useEffect(() => {
    socket.on('resetTimer', () => {
      setTime(60)
      setIsRunning(false)
    })
  }, [])

  if (isRunning) {
    return <Text fontSize="sm">{time}</Text>
  } else {
    return null
  }
}

export default Timer
