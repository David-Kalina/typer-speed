import { useAtom } from 'jotai'
import React from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import { caretOffsetAtom, characterIndexAtom, caretCutOffAtom, socketAtom, wordIndexAtom } from '../../store'

function Index() {
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)
  const [, setWordIndex] = useAtom(wordIndexAtom)
  const [socket] = useAtom(socketAtom)
  const [offset] = useAtom(caretOffsetAtom)
  const [caretCutoff] = useAtom(caretCutOffAtom)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forbiddenKeys.includes(e.key)) {
      return e.preventDefault()
    }

    if (e.code === 'Backspace') {
      if (characterIndex <= 0) return
      socket.emit('backspace')
      return setCharacterIndex(prev => prev - 1)
    } else if (e.code === 'Space') {
      if (characterIndex > 0) {
        socket.emit('space')
        setCharacterIndex(0)
        return setWordIndex(prev => prev + 1)
      }
    } else {
      if (offset.left >= caretCutoff) {
        e.preventDefault()
        return
      }
      socket.emit('key', e.key)
      return setCharacterIndex(prev => prev + 1)
    }
  }

  return (
    <input
      className="key-manager"
      autoFocus
      onKeyDown={e => onKeyDown(e)}
      style={{ height: 0, width: 0, display: 'inline', opacity: 0 }}
    />
  )
}

export default Index
