import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
  caretElementAtom,
  caretPositionAtom2,
  currentCharacterElementAtom,
  currentExtraCharacterElementAtom,
  currentWordElementAtom,
} from '../store'

export const useCaret = () => {
  const [current, setCurrent] = useAtom(currentCharacterElementAtom)
  const [previous, setPrevious] = useState<HTMLDivElement | null>(null)
  const [currentExtra, setCurrentExtra] = useAtom(currentExtraCharacterElementAtom)
  const [currentWordElement] = useAtom(currentWordElementAtom)
  const [caret] = useAtom(caretElementAtom)
  const [position, setPosition] = useAtom(caretPositionAtom2)
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

  // Side Effects

  useEffect(() => {
    if (previousPosition.length <= 1) setTraversingExtra(false)
    if (currentExtra) {
      setTraversingExtra(true)
      setPosition({
        top: currentExtra.offsetTop,
        left: currentExtra.offsetLeft + currentExtra.offsetWidth,
      })
      setPreviousPosition([...previousPosition, { top: currentExtra.offsetTop, left: currentExtra.offsetLeft }])
    }

    return () => {
      setCurrentExtra(null)
    }
  }, [caret, currentExtra, position, previousPosition, setCurrentExtra, setPosition, traversingExtra])

  useEffect(() => {
    if (current) current.style.border = '1px solid yellow'
    return () => {
      if (current) current.style.border = 'none'
    }
  }, [current])

  useEffect(() => {
    if (previous) previous.style.border = '1px solid purple'
    return () => {
      if (previous) previous.style.border = 'none'
    }
  }, [previous])

  useEffect(() => {
    console.log(previousPosition)
  }, [previousPosition])

  return { forward, backward }
}
