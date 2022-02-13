import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
  caretPositionAtom,
  currentCharacterElementAtom,
  currentWordElementAtom,
  extraCharactersAtom,
  wordIndexAtom,
} from '../store'

export const useCaretNavigator = () => {
  const [caretPosition, setCaretPosition] = useAtom(caretPositionAtom)
  const [currentCharacterElement, setCurrentCharacterElement] = useAtom(currentCharacterElementAtom)
  const [currentWordElement, setCurrentWordElement] = useAtom(currentWordElementAtom)
  const [temporaryPrev, setTemporaryPrev] = useState<HTMLDivElement | null>(null)
  const [wordIndex] = useAtom(wordIndexAtom)
  const [extraCharacters] = useAtom(extraCharactersAtom)

  const setPosition = ({
    direction,
    top,
    left,
    cb,
  }: {
    direction: 'forward' | 'backward'
    top?: number
    left: number
    cb: () => void
  }) => {
    setCaretPosition(prev => ({
      ...prev,
      top: top ? top : prev.top,
      left: direction === 'forward' ? prev.left + left : prev.left - left,
    }))
    return cb()
  }

  const moveCaretForward = () => {
    console.log(currentCharacterElement?.nextElementSibling)
    // if (extraCharacters[wordIndex] && extraCharacters[wordIndex].length > 0)
    //   setCurrentCharacterElement(currentWordElement?.previousElementSibling?.lastElementChild as HTMLDivElement)

    if (temporaryPrev) {
      return setPosition({
        direction: 'forward',
        top: temporaryPrev.offsetTop,
        left: temporaryPrev.offsetWidth,
        cb: () => {
          setCurrentCharacterElement(temporaryPrev.nextElementSibling as HTMLDivElement)
          setTemporaryPrev(null)
        },
      })
    }

    if (currentCharacterElement) {
      const next = currentCharacterElement.nextElementSibling as HTMLDivElement
      if (next) {
        setPosition({
          direction: 'forward',
          top: next.offsetTop,
          left: next.offsetWidth,
          cb: () => {
            setCurrentCharacterElement(currentCharacterElement.nextElementSibling as HTMLDivElement)
          },
        })
      } else {
        setPosition({
          direction: 'forward',
          top: currentCharacterElement.offsetTop,
          left: currentCharacterElement.offsetWidth,
          cb: () => {
            setCurrentCharacterElement(currentCharacterElement as HTMLDivElement)
          },
        })
      }
    }
  }

  const moveCaretBackward = () => {
    if (currentCharacterElement) {
      if (currentCharacterElement?.previousElementSibling as HTMLDivElement) {
        setPosition({
          direction: 'backward',
          top: currentCharacterElement.offsetTop,
          left: currentCharacterElement.offsetWidth,
          cb: () => {
            setTemporaryPrev(currentCharacterElement as HTMLDivElement)
            setCurrentCharacterElement(currentCharacterElement.previousElementSibling as HTMLDivElement)
          },
        })
      } else {
        setPosition({
          direction: 'backward',
          top: currentCharacterElement.offsetTop,
          left: currentCharacterElement.offsetWidth,
          cb: () => {
            setTemporaryPrev(null)
            setCurrentCharacterElement(currentCharacterElement as HTMLDivElement)
          },
        })
      }
    }
  }

  const moveCaretToWord = () => {
    if (currentWordElement) {
      setCurrentWordElement(currentWordElement.nextElementSibling as HTMLDivElement)
      setCurrentCharacterElement(currentWordElement.firstElementChild as HTMLDivElement)
      setCaretPosition(prev => ({
        ...prev,
        top: currentWordElement.offsetTop,
        left: currentWordElement.offsetLeft,
      }))
    }
  }

  // useEffect(() => {
  //   console.log(Array.from(document.querySelectorAll('.default')).find((el: any) => el.innerText === 'b'))
  // }, [currentCharacterElement, currentWordElement?.previousElementSibling?.clientWidth])

  return {
    moveCaretBackward,
    moveCaretForward,
    moveCaretToWord,
  }
}
