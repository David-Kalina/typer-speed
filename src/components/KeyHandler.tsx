import { Input } from '@chakra-ui/input'
import { useColorMode } from '@chakra-ui/react'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'
import { useSocketEvent } from '../hooks/useSocketEvent'
import { forbiddenKeys } from '../constants/forbiddenKeys'

const KeyHandler: React.FC = () => {
  const [typedWord, setTypedWord] = React.useState('')
  const [startedTimer, setStartedTimer] = React.useState(false)
  const ref = React.useRef<HTMLInputElement>(null)

  useSocketEvent('resetTypedWord', () => setTypedWord(''))

  useSocketEvent('resetTimer', () => {
    setStartedTimer(false)
    ref.current?.focus()
  })

  useSocketEvent('focus', () => {
    ref.current?.focus()
  })

  const { colorMode } = useColorMode()

  React.useEffect(() => {
    ref.current?.focus()
  }, [colorMode])

  return (
    <Input
      ref={ref}
      mt="4"
      display="hidden"
      value={typedWord}
      _focus={{ border: '1px solid #313641' }}
      height="50px"
      autoFocus
      onChange={() => null}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault()
          return
        }

        if (e.key !== 'Shift' && e.key !== 'Backspace') {
          setTypedWord(prev => prev + e.key)
        }

        if (e.key === 'Backspace') {
          setTypedWord(prev => prev.slice(0, prev.length - 1))
        }

        if (!startedTimer) {
          socket.emit('startTimer')
          setStartedTimer(true)
        }

        socket.emit('key', {
          key: e.code === 'Space' || e.code === 'Backspace' ? e.code : e.key,
        })
      }}
    />
  )
}

export default KeyHandler
