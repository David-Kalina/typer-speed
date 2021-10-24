import * as React from 'react'
import { Text } from '@chakra-ui/react'
import { socket } from '../contexts/SocketContext'

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
  const [time, setTime] = React.useState(60)

  React.useEffect(() => {
    socket.on('timerTick', time => setTime(time))
  }, [])

  React.useEffect(() => {
    socket.on('resetTimer', () => setTime(60))
  }, [])

  return <Text fontSize="2xl">{time}</Text>
}

export default Timer
