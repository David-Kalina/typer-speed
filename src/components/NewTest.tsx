import { Button } from '@chakra-ui/button'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface StarTestProps {}

const StarTest: React.FC<StarTestProps> = () => {
  return <Button onClick={() => socket.emit('init')}>Start Test</Button>
}

export default StarTest
