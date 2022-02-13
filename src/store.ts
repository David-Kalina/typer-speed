import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import { Character } from './classes/Character'
import { WordType } from './types'

export const characterIndexAtom = atomWithReset<number>(0)

export const wordIndexAtom = atomWithReset<number>(0)

export const wordHeightAtom = atomWithReset<number>(0)

export const fontSizeAtom = atom<number>(1.5)

export const wordsAtom = atomWithReset<WordType[]>([])

export const newExtraCharacterAtom = atomWithReset<string>('')

interface ExtraCharactersAtom {
  [key: number]: Character[]
}

export const extraCharactersAtom = atomWithReset<ExtraCharactersAtom>({})

export const loadingAtom = atomWithReset<boolean>(true)

export const newWordsAtom = atomWithReset<WordType[]>([])

export const caretCutOffAtom = atomWithReset<number>(0)

export const timeAtom = atomWithReset<number>(0)

export const testStartedAtom = atomWithReset<boolean>(false)

export const testFinishedAtom = atomWithReset<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const currentWordElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const currentExtraCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const currentCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

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
  caretPositionAtom,
]
