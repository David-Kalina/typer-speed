import { atom } from 'jotai'
import { typerSpeed } from '../constants/themes'
import { currentCharacterElementAtom } from './elementAtoms'

export const caretPositionAtom = atom({ top: 0, left: 0 })

export const caretCutOffAtom = atom<number>(0)

export const caretSettingsAtom = atom({
  delay: 50,
  color: typerSpeed.default,
  height: 1.3,
  width: 0.11,
  opacity: 1,
})

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
