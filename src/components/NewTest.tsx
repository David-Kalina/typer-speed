import { Icon } from '@chakra-ui/react'
import * as React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import { socket } from '../contexts/SocketContext'


const StartTest: React.FC = () => {
  return (
    <Icon
      as={VscDebugRestart}
      w="200px"
      fontSize="lg"
      onClick={() => {
        socket.emit('init')
      }}
      mt="1rem"
      mx="auto"
    />
  )
}

export default StartTest
