import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import {
  caretPositionAtom,
  characterIndexAtom,
  currentCharacterAtom,
  currentWordAtom,
  loadingAtom,
  newWordsAtom,
  socketAtom,
  testFinishedAtom,
  testStartedAtom,
  timeAtom,
  wordsAtom,
} from '../store'

export const useResetTypingTest = () => {
  const [socket] = useAtom(socketAtom)
  const resetCharacterIndex = useResetAtom(characterIndexAtom)
  const resetWords = useResetAtom(wordsAtom)
  const resetLoading = useResetAtom(loadingAtom)
  const resetNewWords = useResetAtom(newWordsAtom)
  const resetTime = useResetAtom(timeAtom)
  const resetTestStarted = useResetAtom(testStartedAtom)
  const resetTestFinished = useResetAtom(testFinishedAtom)
  const resetCurrentWord = useResetAtom(currentWordAtom)
  const resetCurrentCharacter = useResetAtom(currentCharacterAtom)
  const resetCaretPosition = useResetAtom(caretPositionAtom)

  const reset = () => {
    resetCharacterIndex()
    resetWords()
    resetLoading()
    resetNewWords()
    resetTime()
    resetTestStarted()
    resetTestFinished()
    resetCurrentWord()
    resetCurrentCharacter()
    resetCaretPosition()
    socket.emit('init')
  }

  return reset
}
