import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import randomWords from 'random-words'
import { useEffect } from 'react'
import { Character } from '../classes/Character'
import { Word } from '../classes/Word'
import {
  characterIndexAtom,
  currentCharacterElementAtom,
  currentWordElementAtom,
  extraCharactersAtom,
  wordIndexAtom,
  wordsAtom,
} from '../store'

export const useWordManager = () => {
  const [words, setWords] = useAtom(wordsAtom)
  const [wordIndex, setWordIndex] = useAtom(wordIndexAtom)
  const [characterIndex, setCharacterIndex] = useAtom(characterIndexAtom)

  const [extraCharacters, setExtraCharacters] = useAtom(extraCharactersAtom)

  const [currentWordElement] = useAtom(currentWordElementAtom)

  const setCurrentCharacterElement = useUpdateAtom(currentCharacterElementAtom)

  const generateWords = (exactly: number, maxLength: number) => {
    return randomWords({ exactly, maxLength }).map((w: string, wIndex: number) => {
      return new Word(
        w.split('').map(c => {
          return new Character(c, `${c}${new Date().getMilliseconds() * Math.random()}`, wIndex, w, 'default')
        }),
        [],
        wIndex
      )
    })
  }

  const generateWord = (exactly: number, maxLength: number, wordsLengthIndex: number) => {
    return randomWords({ exactly, maxLength }).map((w: string) => {
      return new Word(
        w.split('').map(c => {
          return new Character(c, `${c}${new Date().getMilliseconds() * Math.random()}`, wordsLengthIndex, w, 'default')
        }),
        [],
        wordsLengthIndex
      )
    })
  }

  const getCurrentCharacter = () => {
    return words[wordIndex].characters[characterIndex]
  }

  const getCurrentWord = () => {
    return words[wordIndex]
  }

  const resetCharacterIndex = () => {
    return setCharacterIndex(0)
  }

  const incrementWordIndex = () => {
    resetCharacterIndex()
    return setWordIndex(wordIndex + 1)
  }

  const incrementCharacterIndex = () => {
    return setCharacterIndex(characterIndex + 1)
  }

  const decrementCharacterIndex = () => {
    return setCharacterIndex(characterIndex - 1)
  }

  const addExtraCharacter = (character: string) => {
    const currentWordId = getCurrentWord().id

    // const characterNode = document.createElement('div')
    // characterNode.innerText = character
    // characterNode.className = 'extra'

    // const newElement = currentWordElement?.previousElementSibling?.appendChild(
    //   document.createElement('div').appendChild(characterNode)
    // )

    // setCurrentCharacterElement(newElement as HTMLDivElement)

    const extraChars = extraCharacters[currentWordId] || []

    setExtraCharacters({
      ...extraCharacters,
      [currentWordId]: [
        ...extraChars,
        new Character(
          character,
          `${character}${new Date().getMilliseconds() * Math.random()}`,
          currentWordId,
          '',
          'extra'
        ),
      ],
    })
  }

  useEffect(() => {
    setWords(generateWords(100, 5))
  }, [setWords])

  useEffect(() => {
    console.log(wordIndex)
  }, [wordIndex])

  return {
    generateWords,
    generateWord,
    wordIndex,
    characterIndex,
    setWordIndex,
    setCharacterIndex,
    getCurrentCharacter,
    getCurrentWord,
    resetCharacterIndex,
    incrementWordIndex,
    incrementCharacterIndex,
    addExtraCharacter,
    decrementCharacterIndex,
    words,
  }
}
