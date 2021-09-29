import { Input } from '@chakra-ui/input'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface KeyHandlerProps {}

const KeyHandler: React.FC<KeyHandlerProps> = () => {
  const [typedWord, setTypedWord] = React.useState('')

  socket.on('typedWord', typedWord => setTypedWord(typedWord))

  return (
    <Input
      bg="#2c323d"
      boxShadow="lg"
      value={typedWord}
      _focus={{ border: '1px solid #313641' }}
      height="80px"
      autoFocus
      //@ts-ignore
      onKeyDown={(e: KeyboardEvent) => {
        if (e.code === 'Space') {
          socket.emit('updateWordIndex', { key: e.key })
        }
        if (e.ctrlKey || e.metaKey || e.altKey) {
          e.preventDefault()
        } else {
          socket.emit('updateCharacterIndex', { key: e.code === 'Space' ? e.code : e.key })
        }
      }}
    />
  )
}

export default KeyHandler
