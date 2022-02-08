import { atom } from 'jotai'

export const characterIndexAtom = atom<number>(0)
export const wordIndexAtom = atom<number>(0)
export const timeAtom = atom<number>(0)
export const caretOffsetAtom = atom<number>(0)
export const wordOffsetAtom = atom<{ top: number; left: number }>({
  top: 0,
  left: 0,
})
