import { atom } from 'jotai'
import { caretElementAtom, currentCharacterElementAtom, currentWordElementAtom } from './elementAtoms'

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

export const mountCaretAtom = atom(
  () => '',
  (get, set, caret: HTMLDivElement) => {
    if (caret) {
      const word = caret.nextElementSibling?.firstElementChild as HTMLDivElement
      const character = caret.nextElementSibling?.firstElementChild?.firstElementChild as HTMLDivElement
      if (word && character) {
        set(caretElementAtom, caret)
        set(currentCharacterElementAtom, character)
        set(currentWordElementAtom, word)
        set(caretPositionAtom, {
          top: character.offsetTop,
          left: character.offsetLeft,
        })
      }
    }
  }
)
