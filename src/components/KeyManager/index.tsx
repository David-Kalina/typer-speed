import { useBreakpoint } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { forbiddenKeys } from '../../constants/forbiddenKeys'
import { useKeyManager } from '../../hooks/useKeyManager'
import { caretCutOffAtom, caretPositionAtom } from '../../store/caretAtoms'
import { characterIndexAtom } from '../../store/characterAtoms'
import { testIdAtom, testStartedAtom } from '../../store/typingTestAtoms'

function Index() {
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const ref = React.useRef<HTMLInputElement>(null)
  const { handleBackspace, handleSpace, handleCharacter } = useKeyManager()
  const [characterIndex] = useAtom(characterIndexAtom)
  const [caretPosition] = useAtom(caretPositionAtom)
  const [caretCutOff] = useAtom(caretCutOffAtom)
  const [testId] = useAtom(testIdAtom)
  const breakpoint = useBreakpoint()

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

  useEffect(() => {
    ref.current?.focus()
  }, [testId])

  return (
    <>
      {breakpoint !== 'base' && breakpoint !== 'sm' ? (
        <input
          ref={ref}
          className="key-manager"
          autoFocus
          inputMode="text"
          onKeyDown={e => onKeyDown(e)}
          style={{ height: 0, width: 0, display: 'inline', opacity: 0, position: 'absolute', top: 0, left: 0 }}
        />
      ) : (
        <input
          ref={ref}
          className="key-manager"
          autoFocus
          inputMode="text"
          onKeyDown={e => onKeyDown(e)}
          style={{ display: 'inline', opacity: 0 }}
        />
      )}
    </>
  )
}

Index.displayName = 'KeyManager'

export default Index
