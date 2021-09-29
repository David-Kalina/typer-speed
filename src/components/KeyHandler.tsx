import { Input } from '@chakra-ui/input'
import * as React from 'react'

interface KeyHandlerProps {}

const KeyHandler: React.FC<KeyHandlerProps> = () => {
  return (
    <Input
      bg="#2c323d"
      boxShadow="lg"
      _focus={{ border: '1px solid #313641' }}
      height="80px"
      autoFocus
    />
  )
}

export default KeyHandler
