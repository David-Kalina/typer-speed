import { useAtom } from 'jotai'
import React from 'react'
import { characterIndexAtom, wordIndexAtom } from '../../store'

function Index() {
  const [, setWordIndex] = useAtom(wordIndexAtom)
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace') {
      if (characterIndex <= 0) {
        return
      }
      return setCharacterIndex(prev => (prev -= 1))
    }

    if (e.code === 'Space') {
      setWordIndex(prev => prev + 1)
      setCharacterIndex(0)
    } else {
      setCharacterIndex(prev => prev + 1)
    }
  }

  return <input className="key-manager" autoFocus onKeyDown={e => onKeyDown(e)} />
}

export default Index
