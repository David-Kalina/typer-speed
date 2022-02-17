import { useAtom } from 'jotai'
import React from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import { useKeyManager } from '../../hooks/useKeyManager'
import { caretCutOffAtom, caretPositionAtom } from '../../store/caretAtoms'
import { characterIndexAtom } from '../../store/characterAtoms'
import { testStartedAtom } from '../../store/typingTestAtoms'

function Index() {
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const ref = React.useRef<HTMLInputElement>(null)
  const { handleBackspace, handleSpace, handleCharacter } = useKeyManager()
  const [characterIndex] = useAtom(characterIndexAtom)
  const [caretPosition] = useAtom(caretPositionAtom)
  const [caretCutOff] = useAtom(caretCutOffAtom)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forbiddenKeys.includes(e.key)) return e.stopPropagation()

    if (e.code === 'Backspace') {
      if (characterIndex <= 0) return e.preventDefault()
      return handleBackspace()
    } else if (e.code === 'Space') {
      if (characterIndex <= 0) return e.preventDefault()
      return handleSpace()
    } else {
      if (caretPosition.left > caretCutOff) return e.preventDefault()
      if (!testStarted) setTestStarted(true)
      return handleCharacter(e.key)
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
