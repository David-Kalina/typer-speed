import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { useLocation } from 'react-location'
import {
  characterIndexAtom,
  newWordsAtom,
  socketAtom,
  testFinishedAtom,
  testStartedAtom,
  timeAtom,
  wordHeightAtom,
  wordIndexAtom,
  wordsAtom
} from '../store'

export const useResetTypingTest = () => {
  const [socket] = useAtom(socketAtom)
  const resetWordIndex = useResetAtom(wordIndexAtom)
  const resetCharacterIndex = useResetAtom(characterIndexAtom)
  const resetWordHeight = useResetAtom(wordHeightAtom)
  // const resetWordOffset = useResetAtom(wordOffsetAtom)
  const resetWords = useResetAtom(wordsAtom)
  const resetNewWords = useResetAtom(newWordsAtom)
  const resetTime = useResetAtom(timeAtom)
  const resetTestStarted = useResetAtom(testStartedAtom)
  const resetTestFinished = useResetAtom(testFinishedAtom)
  // const [, resetCaret] = useAtom(caretOffsetAtom)

  const reset = React.useCallback(() => {
    resetWordIndex()
    resetCharacterIndex()
    resetWordHeight()
    // resetWordOffset()
    // resetCaret()
    resetWords()
    resetNewWords()
    resetTime()
    resetTestStarted()
    resetTestFinished()
    socket.emit('resetTimer')
    socket.emit('init')
  }, [resetWordIndex, resetCharacterIndex, resetWordHeight, resetWords, resetNewWords, socket, resetTime, resetTestStarted, resetTestFinished])

  const { current } = useLocation()

  useEffect(() => {
    socket.on('reset', reset)

    return () => {
      socket.off('reset')
    }
  }, [reset, socket, current])

  return reset
}
