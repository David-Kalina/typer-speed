import { Button } from '@chakra-ui/button'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface StarTestProps {}

const StarTest: React.FC<StarTestProps> = () => {
  return (
    <Button w="200px" onClick={() => socket.emit('init')} mt="1rem" mx="auto">
      New Test
    </Button>
  )
}

export default StarTest
