import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import { io } from 'socket.io-client'
import { WordType } from './types'

export const socketAtom = atom(io(process.env.REACT_APP_SOCKET_SERVER as string))

export const characterIndexAtom = atomWithReset<number>(0)

export const wordHeightAtom = atomWithReset<number>(0)

export const fontSizeAtom = atom<number>(2)

export const wordsAtom = atomWithReset<WordType[]>([])

export const loadingAtom = atomWithReset<boolean>(true)

export const newWordsAtom = atomWithReset<WordType[]>([])

export const caretCutOffAtom = atomWithReset<number>(0)

export const timeAtom = atomWithReset<number>(0)

export const testStartedAtom = atomWithReset<boolean>(false)

export const testFinishedAtom = atomWithReset<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const currentWordAtom = atomWithReset<HTMLDivElement | null>(null)
export const currentCharacterAtom = atomWithReset<HTMLDivElement | null>(null)

export const caretPositionAtom = atomWithReset<{
  top: number
  left: number
}>({
  top: 0,
  left: 0,
})

export const resetAtoms = [
  characterIndexAtom,
  wordsAtom,
  loadingAtom,
  newWordsAtom,
  timeAtom,
  testStartedAtom,
  testFinishedAtom,
  currentWordAtom,
  currentCharacterAtom,
  caretPositionAtom,
]
