import { atom } from 'jotai'
import { io } from 'socket.io-client'
import { WordType } from './types'

export const socketAtom = atom(io(process.env.REACT_APP_SOCKET_SERVER as string))
export const characterIndexAtom = atom<number>(0)

export const wordIndexAtom = atom<number>(0)

export const wordHeightAtom = atom<number>(0)

export const fontSizeAtom = atom<number>(1.5)

export const wordsAtom = atom<WordType[]>([])

export const newWordsAtom = atom<WordType[]>([])

export const caretCutOffAtom = atom<number>(0)

export const timeAtom = atom<number>(0)

export const wordOffsetAtom = atom<{ top: number; left: number }>({
  top: 0,
  left: 0,
})

export const caretOffsetAtom = atom(get => {
  const { top, left } = get(wordOffsetAtom)
  return {
    top,
    left: left + get(characterIndexAtom) * 16 * get(fontSizeAtom) * 0.6,
  }
})
