import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import {
  caretPositionAtom,
  currentCharacterElementAtom,
  currentExtraCharacterElementAtom,
  currentWordElementAtom,
  extraCharactersAtom,
} from '../store'

export const useCaretNavigator = () => {
  const [caretPosition, setCaretPosition] = useAtom(caretPositionAtom)
  const [currentCharacterElement, setCurrentCharacterElement] = useAtom(currentCharacterElementAtom)
  const [currentWordElement, setCurrentWordElement] = useAtom(currentWordElementAtom)
  const [temporaryPrev, setTemporaryPrev] = useState<HTMLDivElement | null>(null)
  const [extraCharacters] = useAtom(extraCharactersAtom)

  const [currentExtraCharacterElement, setCurrentExtraCharacterElement] = useAtom(currentExtraCharacterElementAtom)

  const [isExtraCharacter, setIsExtraCharacter] = useState(false)

  const setPosition = useCallback(
    ({
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
    },
    [setCaretPosition]
  )

  const moveCaretForward = (ref: HTMLDivElement) => {
    if (!isExtraCharacter) {
      if (ref) {
        setPosition({
          direction: 'forward',
          top: ref.offsetTop,
          left: ref.offsetWidth,
          cb: () => {
            setCurrentCharacterElement(ref.nextElementSibling as HTMLDivElement)
          },
        })
      } else {
        console.log('no ref')
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
      console.log(currentWordElement.firstElementChild)
      setCurrentWordElement(currentWordElement.nextElementSibling as HTMLDivElement)
      setCurrentCharacterElement(currentWordElement.firstElementChild as HTMLDivElement)
      setCaretPosition(prev => ({
        ...prev,
        top: currentWordElement.offsetTop,
        left: currentWordElement.offsetLeft,
      }))
    }
  }

  useEffect(() => {
    if (currentExtraCharacterElement) {
      setPosition({
        direction: 'forward',
        top: currentExtraCharacterElement.offsetTop,
        left: currentExtraCharacterElement.offsetWidth,
        cb: () => {
          return null
        },
      })
    }
    return () => {
      setCurrentExtraCharacterElement(null)
    }
  }, [
    currentCharacterElement,
    currentExtraCharacterElement,
    isExtraCharacter,
    setCurrentCharacterElement,
    setCurrentExtraCharacterElement,
    setPosition,
  ])

  return {
    moveCaretBackward,
    moveCaretForward,
    moveCaretToWord,
  }
}
