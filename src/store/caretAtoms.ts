import { atom } from 'jotai'
import { currentCharacterElementAtom } from './elementAtoms'

export const caretPositionAtom = atom({ top: 0, left: 0 })

export const caretCutOffAtom = atom<number>(0)

export const updateCaretPositionAtom = atom(
  get => {
    return {
      top: get(currentCharacterElementAtom)?.offsetTop,
      left: get(currentCharacterElementAtom)?.offsetLeft,
    }
  },
  (get, set, { top, left }) => {
    return set(caretPositionAtom, {
      top,
      left,
    })
  }
)
