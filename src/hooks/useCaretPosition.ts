import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { characterIndexAtom, currentCharacterAtom, testStartedAtom } from '../store'

export const useCaretPosition = () => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })

  const [currentCharacter, setCurrentCharacter] = useAtom(currentCharacterAtom)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)

  const [characterIndex] = useAtom(characterIndexAtom)

  useEffect(() => {
    console.log(position)
  }, [position])

  useEffect(() => {
    console.log(currentCharacter)
  }, [currentCharacter])
  return position
}
