import { Input } from '@chakra-ui/input'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'
import { useSocketEvent } from '../hooks/useSocketEvent'

interface KeyHandlerProps {}

const KeyHandler: React.FC<KeyHandlerProps> = () => {
  const [typedWord, setTypedWord] = React.useState('')
  const [startedTimer, setStartedTimer] = React.useState(false)
  const ref = React.useRef<HTMLInputElement>(null)

  useSocketEvent('resetTypedWord', () => setTypedWord(''))

  useSocketEvent('resetTimer', () => {
    setStartedTimer(false)
    ref.current?.focus()
  })

  return (
    <Input
      ref={ref}
      mt="4"
      display="hidden"
      value={typedWord}
      _focus={{ border: '1px solid #313641' }}
      height="50px"
      autoFocus
      //@ts-ignore
      onKeyDown={(e: KeyboardEvent) => {
        if (!startedTimer) {
          socket.emit('startTimer')
          setStartedTimer(true)
        }

        if (e.code === 'Space') {
          socket.emit('updateWordIndex', { key: e.key })
        }
        if (e.ctrlKey || e.metaKey || e.altKey) {
          e.preventDefault()
        } else {
          if (e.key !== 'Shift' && e.key !== 'Backspace') {
            setTypedWord(prev => prev + e.key)
          }
          if (e.key === 'Backspace') {
            setTypedWord(prev => prev.slice(0, prev.length - 1))
          }

          socket.emit('updateCharacterIndex', { key: e.code === 'Space' ? e.code : e.key })
        }
      }}
    />
  )
}

export default KeyHandler
