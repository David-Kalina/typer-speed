import { useAtom } from 'jotai'
import React from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import { useKeyManager } from '../../hooks/useKeyManager'
import { characterIndexAtom, testStartedAtom } from '../../store'

function Index() {
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const ref = React.useRef<HTMLInputElement>(null)

  const { handleBackspace, handleCharacter, handleSpace } = useKeyManager()

  const [characterIndex] = useAtom(characterIndexAtom)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forbiddenKeys.includes(e.key)) {
      return e.stopPropagation()
    }
    if (e.code === 'Backspace') {
      if (characterIndex <= 0) return e.preventDefault()
      handleBackspace()
    } else if (e.code === 'Space') {
      handleSpace()
    } else {
      if (!testStarted) setTestStarted(true)
      handleCharacter(e.key)
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
