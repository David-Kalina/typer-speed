import { useResetAtom } from 'jotai/utils'
import {
  caretPositionAtom,
  characterIndexAtom,
  loadingAtom,
  newWordsAtom,
  testFinishedAtom,
  testStartedAtom,
  testTimeAtom,
  // wordsAtom,
} from '../store'

export const useResetTypingTest = () => {
  const resetCharacterIndex = useResetAtom(characterIndexAtom)
  // const resetWords = useResetAtom(wordsAtom)
  const resetLoading = useResetAtom(loadingAtom)
  const resetNewWords = useResetAtom(newWordsAtom)
  const resetTime = useResetAtom(testTimeAtom)
  const resetTestStarted = useResetAtom(testStartedAtom)
  const resetTestFinished = useResetAtom(testFinishedAtom)

  const resetCaretPosition = useResetAtom(caretPositionAtom)

  const reset = () => {
    resetCharacterIndex()
    // resetWords()
    resetLoading()
    resetNewWords()
    resetTime()
    resetTestStarted()
    resetTestFinished()
    resetCaretPosition()
  }

  return reset
}
