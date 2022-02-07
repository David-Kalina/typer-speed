import { Icon } from '@chakra-ui/react'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { socket } from '../contexts/SocketContext'
import { useTime } from '../contexts/TimeContext'

const StartTest: React.FC = () => {
  const [time] = useTime()
  return (
    <Icon
      cursor="pointer"
      as={VscDebugRestart}
      w="200px"
      fontSize="lg"
      onClick={() => socket.emit('init', time)}
      mt="1rem"
      mx="auto"
    />
  )
}

export default StartTest
