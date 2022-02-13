import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import { useNavigateCaret } from '../../hooks/useNavigateCaret'
import { characterIndexAtom, socketAtom, testStartedAtom } from '../../store'

function Index() {
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)
  const [socket] = useAtom(socketAtom)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const { moveCaretBackward, moveCaretForward, moveCaretToNextWord } = useNavigateCaret()
  const ref = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    socket.on('focus', () => {
      ref.current?.focus()
    })
    return () => {
      socket.off('focus')
    }
  }, [socket])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forbiddenKeys.includes(e.key)) {
      return e.stopPropagation()
    }
    if (e.code === 'Backspace') {
      if (characterIndex <= 0) return
      socket.emit('backspace')
      moveCaretBackward()
      setCharacterIndex(prev => prev - 1)
    } else if (e.code === 'Space') {
      if (characterIndex > 0) {
        socket.emit('space')
        moveCaretToNextWord()
        setCharacterIndex(0)
      }
    } else {
      if (!testStarted) setTestStarted(true)
      socket.emit('key', e.key)
      setCharacterIndex(prev => prev + 1)
      moveCaretForward()
    }
  }

  return (
    <input
      ref={ref}
      className="key-manager"
      autoFocus
      onKeyDown={e => onKeyDown(e)}
      style={{ height: 0, width: 0, display: 'inline', opacity: 0, position: 'absolute', top: 0, left: 0 }}
    />
  )
}

Index.displayName = 'KeyManager'

export default Index
