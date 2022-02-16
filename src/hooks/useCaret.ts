import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect, useState } from 'react'
import { updateCaretPositionAtom } from '../store/caretAtoms'

import {
  currentWordElementAtom,
  currentExtraCharacterElementAtom,
  caretElementAtom,
  currentCharacterElementAtom,
} from '../store/elementAtoms'

export const useCaret = () => {
  const [current, setCurrent] = useAtom(currentCharacterElementAtom)
  const [previous, setPrevious] = useState<HTMLDivElement | null>(null)
  const [currentExtra, setCurrentExtra] = useAtom(currentExtraCharacterElementAtom)
  const [currentWordElement, setCurrentWordElement] = useAtom(currentWordElementAtom)
  const [caret] = useAtom(caretElementAtom)
  const setPosition = useUpdateAtom(updateCaretPositionAtom)
  const [traversingExtra, setTraversingExtra] = useState(false)
  const [previousPosition, setPreviousPosition] = useState<
    {
      top: number
      left: number
    }[]
  >([{ top: 0, left: 0 }])

  const forward = () => {
    if (caret && !traversingExtra) {
      if (current && current.nextElementSibling) {
        setPosition({
          top: current.offsetTop,
          left: current.offsetWidth + current.offsetLeft,
        })
        setCurrent(current?.nextElementSibling as HTMLDivElement)
        setPrevious(current)
      } else if (current && !current.nextElementSibling) {
        setPosition({
          top: current.offsetTop,
          left: current.offsetWidth + current.offsetLeft,
        })
        setPrevious(current)
      }
    }
  }

  const backward = () => {
    if (caret && !traversingExtra) {
      if (previous) {
        setPosition({
          top: previous.offsetTop,
          left: previous.offsetLeft,
        })
        setCurrent(previous as HTMLDivElement)
        setPrevious(previous?.previousElementSibling as HTMLDivElement)
      }
    } else {
      setPreviousPosition(previousPosition.slice(0, previousPosition.length - 1))
      setPosition(previousPosition[previousPosition.length - 1])
    }
  }

  const newWord = () => {
    if (caret && currentWordElement) {
      const nextWord = currentWordElement.nextElementSibling as HTMLDivElement
      if (currentWordElement && nextWord) {
        setPosition({
          top: nextWord.offsetTop,
          left: nextWord.offsetLeft,
        })
        setCurrentWordElement(nextWord)
        setCurrent(nextWord.firstElementChild as HTMLDivElement)
        setPrevious(current)
      }
    }
  }

  // Side Effects
  useEffect(() => {
    if (currentExtra) {
      setPosition({
        top: currentExtra.offsetTop,
        left: currentExtra.offsetLeft + currentExtra.offsetWidth,
      })
    }

    return () => {
      setCurrentExtra(null)
    }
  }, [caret, currentExtra, previousPosition, setCurrentExtra, setPosition, traversingExtra])

  useEffect(() => {
    if (previousPosition.length <= 1) setTraversingExtra(false)
  }, [traversingExtra, previousPosition])

  useEffect(() => {
    setTraversingExtra(false)
    setPreviousPosition([{ top: 0, left: 0 }])
  }, [currentWordElement])

  useEffect(() => {
    if (currentExtra) setTraversingExtra(true)
  }, [currentExtra])

  useEffect(() => {
    if (currentExtra)
      setPreviousPosition([...previousPosition, { top: currentExtra.offsetTop, left: currentExtra.offsetLeft }])
  }, [currentExtra, previousPosition])

  // Debug only

  // useEffect(() => {
  //   if (current) current.style.border = '1px solid yellow'
  //   return () => {
  //     if (current) current.style.border = 'none'
  //   }
  // }, [current])

  // useEffect(() => {
  //   if (previous) previous.style.border = '1px solid purple'
  //   return () => {
  //     if (previous) previous.style.border = 'none'
  //   }
  // }, [previous])

  // useEffect(() => {
  //   if (currentWordElement) currentWordElement.style.border = '1px solid red'

  //   return () => {
  //     if (currentWordElement) currentWordElement.style.border = 'none'
  //   }
  // }, [currentWordElement])

  return { forward, backward, newWord }
}
