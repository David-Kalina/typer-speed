import { atom } from 'jotai'
import { io } from 'socket.io-client'
import { WordType } from './types'

export const socketAtom = atom(io(process.env.REACT_APP_SOCKET_SERVER as string))
export const characterIndexAtom = atom<number>(0)

export const wordsAtom = atom<WordType[]>([])

export const wordIndexAtom = atom<number>(0)
export const timeAtom = atom<number>(0)
export const caretOffsetAtom = atom<number>(0)
export const wordOffsetAtom = atom<{ top: number; left: number }>({
  top: 0,
  left: 0,
})


const incorrectCharactersAtom = atom<number[]>([]);
