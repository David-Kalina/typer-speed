import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { generateWords } from '../utils/generateWords'
import { characterIndexAtom } from './characterAtoms'
import { resultsAtom } from './resultsAtoms'
import { wordIndexAtom, wordsAtom } from './wordAtoms'

export const themeAtom = atomWithStorage<string>('theme', 'mountainHaze')

export const wordHeightAtom = atom<number>(0)

export const fontSizeAtom = atom<number>(1)

export const loadingAtom = atom<boolean>(true)

export const testTime = atom<number>(15)

export const elapsedTimeAtom = atom<number>(0)

export const testStartedAtom = atom<boolean>(false)

export const setTestStartedAtom = atom(
  get => get(testStartedAtom),
  (get, set) => set(testStartedAtom, true)
)

export const testFinishedAtom = atom<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const resetTypingTestAtom = atom(
  () => '',
  (get, set) => {
    set(characterIndexAtom, 0)
    set(wordIndexAtom, 0)
    set(wordsAtom, generateWords(100, 5))
    set(wordHeightAtom, 0)
    set(fontSizeAtom, 1.5)
    set(loadingAtom, true)
    set(testTimeAtom, 0)
    set(testStartedAtom, false)
    set(testFinishedAtom, false)
    set(resultsAtom, [])
    set(elapsedTimeAtom, 0)
  }
)