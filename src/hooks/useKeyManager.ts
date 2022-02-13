import { useAtom } from 'jotai'
import { useState } from 'react'
import {
  copyCurrentCharacterElementAtom,
  currentCharacterElementAtom,
  extraCharactersAtom,
  wordIndexAtom,
} from '../store'
import { useCaretNavigator } from './useNavigateCaret'
import { useWordManager } from './useWordManager'

export const useKeyManager = () => {
  const [typedKeys, setTypedKeys] = useState('')

  const {
    incrementCharacterIndex,
    incrementWordIndex,
    getCurrentCharacter,
    decrementCharacterIndex,
    resetCharacterIndex,
    addExtraCharacter,
    removeExtraCharacter,
  } = useWordManager()

  const { moveCaretBackward, moveCaretForward, moveCaretToWord } = useCaretNavigator()

  const [currentCharacterElement] = useAtom(currentCharacterElementAtom)
  const [currentCharacterElementCopy] = useAtom(copyCurrentCharacterElementAtom)
  const [wordIndex] = useAtom(wordIndexAtom)
  const [extraCharacters] = useAtom(extraCharactersAtom)

  const handleBackspace = () => {
    setTypedKeys(typedKeys.slice(0, typedKeys.length - 1))
    decrementCharacterIndex()
    moveCaretBackward(currentCharacterElementCopy as HTMLDivElement)
    removeExtraCharacter()
  }
  const handleCharacter = (key: string) => {
    const currentCharacter = getCurrentCharacter()

    setTypedKeys(typedKeys + key)

    if (currentCharacter && typedKeys.length < currentCharacter.word.length) {
      if (key === currentCharacter.value) {
        console.log('correct')
      }
      if (key !== currentCharacter.value) {
        console.log('incorrect', currentCharacter.value, key)
      }
      setTypedKeys('')
      incrementCharacterIndex()
      moveCaretForward(currentCharacterElement as HTMLDivElement)
    } else {
      addExtraCharacter(key)
      incrementCharacterIndex()
      moveCaretForward(currentCharacterElement as HTMLDivElement)
    }
  }

  const handleSpace = () => {
    setTypedKeys('')
    resetCharacterIndex()
    incrementWordIndex()
    moveCaretToWord()
  }

  return {
    handleBackspace,
    handleCharacter,
    handleSpace,
    typedKeys,
    setTypedKeys,
  }
}
function currentCharacterElementCopyAtom(currentCharacterElementCopyAtom: any): [any] {
  throw new Error('Function not implemented.')
}
