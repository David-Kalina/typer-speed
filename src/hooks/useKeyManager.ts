import { useAtom } from 'jotai'
import { useState } from 'react'

import { wordIndexAtom, addWordsAtom, incrementWordIndexAtom } from '../store/wordAtoms'
import {
  incrementCharacterIndexAtom,
  decrementCharacterIndexAtom,
  resetCharacterIndexAtom,
  getCurrentCharacterAtom,
  updateCharactersAtom,
  addCharactersAtom,
  removeCharacterAtom,
  updateCharacterAtom,
} from '../store/characterAtoms'
import { useCaret } from './useCaret'
import { setTestStartedAtom } from '../store/typingTestAtoms'

export const useKeyManager = () => {
  const [typedKeys, setTypedKeys] = useState('')
  const [, incrementCharacterIndex] = useAtom(incrementCharacterIndexAtom)
  const [, decrementCharacterIndex] = useAtom(decrementCharacterIndexAtom)
  const [, resetCharacterIndex] = useAtom(resetCharacterIndexAtom)
  const [currentCharacter] = useAtom(getCurrentCharacterAtom)
  const [wordIndex] = useAtom(wordIndexAtom)
  const [, incrementWordIndex] = useAtom(incrementWordIndexAtom)
  const [, updateCharacter] = useAtom(updateCharacterAtom)
  const [, addWords] = useAtom(addWordsAtom)
  const [, updateCharacters] = useAtom(updateCharactersAtom)
  const [, addCharacters] = useAtom(addCharactersAtom)
  const [, removeCharacter] = useAtom(removeCharacterAtom)
  const [, setTestStarted] = useAtom(setTestStartedAtom)

  const { forward, backward, newWord } = useCaret()

  const handleBackspace = () => {
    backward()
    removeCharacter({ className: 'extra' })
    setTypedKeys(typedKeys.slice(0, typedKeys.length - 1))
    decrementCharacterIndex()
    updateCharacter({ className: 'default' })
  }

  const handleCharacter = (key: string) => {
    forward()
    setTypedKeys(typedKeys + key)
    if (currentCharacter && typedKeys.length < currentCharacter.word.length) {
      if (key === currentCharacter.value) {
        updateCharacter({ className: 'correct' })
      }
      if (key !== currentCharacter.value) {
        updateCharacter({ className: 'incorrect' })
      }
      incrementCharacterIndex()
      setTypedKeys('')
    } else {
      addCharacters(key)
      incrementCharacterIndex()
    }
    setTestStarted(true)
  }

  const handleSpace = () => {
    newWord()
    updateCharacters({ className: 'default', replaceClassName: 'missed', wordIndex })
    setTypedKeys('')
    incrementWordIndex()
    resetCharacterIndex()
    addWords(1)
  }

  return {
    handleBackspace,
    handleCharacter,
    handleSpace,
    typedKeys,
    setTypedKeys,
  }
}
