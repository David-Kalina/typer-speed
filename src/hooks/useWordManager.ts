import { useAtom } from 'jotai'
import {
  characterIndexAtom,
  // extraCharactersAtom,
  // generateWordAtom,
  // generateWordsAtom,
  wordIndexAtom,
} from '../store'

export const useWordManager = () => {
  // const [words, setWords] = useAtom(generateWordsAtom)
  // const [generateWord] = useAtom(generateWordAtom)
  const [wordIndex, setWordIndex] = useAtom(wordIndexAtom)
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)
  // const [extraCharacters, setExtraCharacters] = useAtom(extraCharactersAtom)

  // const getCurrentWord = () => {
  //   return words
  // }

  const resetCharacterIndex = () => {
    return setCharacterIndex(0)
  }

  const incrementWordIndex = () => {
    resetCharacterIndex()
    return setWordIndex(wordIndex + 1)
  }

  const incrementCharacterIndex = () => {
    setCharacterIndex(characterIndex + 1)
  }

  const decrementCharacterIndex = () => {
    setCharacterIndex(characterIndex - 1)
  }

  // const addExtraCharacter = (character: string) => {
  //   const currentWordId = getCurrentWord().id

  //   const extraChars = extraCharacters[currentWordId] || []

  //   setExtraCharacters({
  //     ...extraCharacters,
  //     [currentWordId]: [
  //       ...extraChars,
  //       new Character(
  //         character,
  //         `${character}${new Date().getMilliseconds() * Math.random()}`,
  //         currentWordId,
  //         '',
  //         'extra'
  //       ),
  //     ],
  //   })
  // }

  return {
    // generateWords,
    // generateWord,
    wordIndex,
    characterIndex,
    setWordIndex,
    setCharacterIndex,
    // getCurrentCharacter,
    // getCurrentWord,
    resetCharacterIndex,
    // setCorrectCharacter,
    // setIncorrectCharacter,
    incrementWordIndex,
    incrementCharacterIndex,
    // addExtraCharacter,
    decrementCharacterIndex,
    // words,
  }
}
