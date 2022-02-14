import { useAtom } from 'jotai'
import { useState } from 'react'
import {
  characterIndexAtom,
  decrementCharacterIndexAtom,
  getCurrentCharacterAtom,
  incrementCharacterIndexAtom,
  incrementWordIndexAtom,
  resetCharacterIndexAtom,
  updateCharacterAtom,
  wordIndexAtom,
  wordsAtom,
} from '../store'
import { useCaretNavigator } from './useNavigateCaret'

export const useKeyManager = () => {
  const [typedKeys, setTypedKeys] = useState('')
  const { moveCaretBackward, moveCaretForward, moveCaretToWord } = useCaretNavigator()
  const [, incrementCharacterIndex] = useAtom(incrementCharacterIndexAtom)
  const [, decrementCharacterIndex] = useAtom(decrementCharacterIndexAtom)
  const [, resetCharacterIndex] = useAtom(resetCharacterIndexAtom)
  const [currentCharacter] = useAtom(getCurrentCharacterAtom)
  const [characterIndex] = useAtom(characterIndexAtom)
  const [wordIndex] = useAtom(wordIndexAtom)
  const [, incrementWordIndex] = useAtom(incrementWordIndexAtom)
  const [, updateCharacter] = useAtom(updateCharacterAtom)
  const [words] = useAtom(wordsAtom)
  // const [currentCharacterElement] = useAtom(currentCharacterElementAtom)
  // const [currentCharacterElementCopy] = useAtom(copyCurrentCharacterElementAtom)
  // const [wordIndex] = useAtom(wordIndexAtom)
  // const [extraCharacters] = useAtom(extraCharactersAtom)

  const handleBackspace = () => {
    setTypedKeys(typedKeys.slice(0, typedKeys.length - 1))
    decrementCharacterIndex()
  }
  const handleCharacter = (key: string) => {
    setTypedKeys(typedKeys + key)
    if (currentCharacter && typedKeys.length < currentCharacter.word.length) {
      if (key === currentCharacter.value) {
        updateCharacter({ className: 'correct' })
      }
      if (key !== currentCharacter.value) {
        updateCharacter({ className: 'incorrect' })
      }
      setTypedKeys('')
      incrementCharacterIndex()
    } else {
      incrementCharacterIndex()
    }
  }

  const handleSpace = () => {
    setTypedKeys('')
    resetCharacterIndex()
    incrementWordIndex()
  }

  return {
    handleBackspace,
    handleCharacter,
    handleSpace,
    typedKeys,
    setTypedKeys,
  }
}
