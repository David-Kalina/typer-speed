import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { CharactersAtom, generateWords } from '../utils/generateWords'

export const wordIndexAtom = atomWithReset<number>(0)

export const wordsAtom = atom<CharactersAtom>(generateWords(100, 5))

export const addWordsAtom = atom(
  get => get(wordsAtom),
  (get, set, { count, maxLength }) => {
    const words = generateWords(count, maxLength, Object.keys(get(wordsAtom)).length)

    return set(wordsAtom, {
      ...get(wordsAtom),
      ...words,
    })
  }
)

export const incrementWordIndexAtom = atom(
  get => get(wordIndexAtom),
  (get, set) => set(wordIndexAtom, get(wordIndexAtom) + 1)
)

export const decrementWordIndexAtom = atom(
  get => get(wordIndexAtom),
  (get, set) => set(wordIndexAtom, get(wordIndexAtom) - 1)
)
