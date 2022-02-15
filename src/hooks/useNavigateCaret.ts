import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import {
  caretPositionAtom,
  copyCurrentCharacterElementAtom,
  copyCurrentExtraCharacterElementAtom,
  currentCharacterElementAtom,
  currentExtraCharacterElementAtom,
  currentWordElementAtom,
} from '../store'

export const useCaretNavigator = () => {
  const [, setCaretPosition] = useAtom(caretPositionAtom)
  const [currentCharacterElement, setCurrentCharacterElement] = useAtom(currentCharacterElementAtom)
  const [currentCharacterElementCopy, setCurrentCharacterElementCopy] = useAtom(copyCurrentCharacterElementAtom)
  const [currentWordElement, setCurrentWordElement] = useAtom(currentWordElementAtom)
  const [traversingExtra, setTraversingExtra] = useState(false)
  const [currentExtraCharacterElement, setCurrentExtraCharacterElement] = useAtom(currentExtraCharacterElementAtom)
  const [copyCurrentExtraCharacterElement, setCopyCurrentExtraCharacterElement] = useAtom(
    copyCurrentExtraCharacterElementAtom
  )

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
    if (ref) {
      setPosition({
        direction: 'forward',
        top: ref.offsetTop,
        left: ref.offsetWidth,
        cb: () => {
          setCurrentCharacterElement(ref.nextElementSibling as HTMLDivElement)
          setCurrentCharacterElementCopy(ref as HTMLDivElement)
        },
      })
    }
  }

  const moveCaretBackward = (ref: HTMLDivElement) => {
    if (!traversingExtra) {
      if (ref) {
        console.log(ref)
        setPosition({
          direction: 'backward',
          top: ref.offsetTop,
          left: ref.offsetWidth,
          cb: () => {
            // setCurrentCharacterElement(ref.previousElementSibling as HTMLDivElement)
            setCurrentCharacterElementCopy(ref.previousElementSibling as HTMLDivElement),
              setCurrentCharacterElement(ref as HTMLDivElement)
          },
        })
      }
    } else {
      if (copyCurrentExtraCharacterElement as HTMLDivElement) {
        setPosition({
          direction: 'backward',
          top: copyCurrentExtraCharacterElement?.offsetTop,
          left: copyCurrentExtraCharacterElement?.offsetWidth as number,
          cb: () => {
            setCopyCurrentExtraCharacterElement(
              copyCurrentExtraCharacterElement?.previousElementSibling as HTMLDivElement
            )
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

  useEffect(() => {
    if (currentExtraCharacterElement) {
      setTraversingExtra(true)
      setCaretPosition({
        top: currentExtraCharacterElement.offsetTop,
        left: currentExtraCharacterElement.offsetLeft + currentExtraCharacterElement.offsetWidth,
      })
    }
    return () => {
      setCurrentExtraCharacterElement(null)
    }
  }, [
    currentCharacterElement,
    currentCharacterElementCopy,
    currentExtraCharacterElement,
    setCaretPosition,
    setCopyCurrentExtraCharacterElement,
    setCurrentCharacterElement,
    setCurrentExtraCharacterElement,
    setPosition,
  ])

  useEffect(() => {
    if (!copyCurrentExtraCharacterElement?.className.includes('extra')) {
      setTraversingExtra(false)
      console.log(currentCharacterElement, currentCharacterElementCopy)
    }
  }, [copyCurrentExtraCharacterElement?.className, currentCharacterElement, currentCharacterElementCopy])

  return {
    moveCaretBackward,
    moveCaretForward,
    moveCaretToWord,
  }
}
