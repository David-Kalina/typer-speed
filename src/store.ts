import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import { io } from 'socket.io-client'
import { WordType } from './types'

export const socketAtom = atom(io(process.env.REACT_APP_SOCKET_SERVER as string))
export const characterIndexAtom = atomWithReset<number>(0)

export const wordIndexAtom = atomWithReset<number>(0)

export const wordHeightAtom = atomWithReset<number>(0)

export const startScrollingAtom = atomWithReset<boolean>(false)

export const fontSizeAtom = atom<number>(1.5)

export const wordsAtom = atomWithReset<WordType[]>([])

export const loadingAtom = atomWithReset<boolean>(true)

export const newWordsAtom = atomWithReset<WordType[]>([])

export const caretCutOffAtom = atomWithReset<number>(0)

export const timeAtom = atomWithReset<number>(0)

export const testStartedAtom = atomWithReset<boolean>(false)

export const testFinishedAtom = atomWithReset<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const wordOffsetAtom = atomWithReset<{ top: number; left: number }>({
  top: 0,
  left: 0,
})

export const caretOffsetAtom = atom(
  get => {
    return {
      top: get(wordOffsetAtom).top,
      left: get(wordOffsetAtom).left + get(characterIndexAtom) * 16 * get(fontSizeAtom) * 0.6,
    }
  },
  (get, set) => {
    set(wordOffsetAtom, { top: 0, left: 0 }), set(characterIndexAtom, 0)
  }
)
