import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import { WordType } from './types'
import { CharactersAtom, generateWords } from './utils/generateWords'

export const characterIndexAtom = atomWithReset<number>(0)

export const wordIndexAtom = atomWithReset<number>(0)

export const wordsAtom = atom<CharactersAtom>(generateWords(10, 5))

export const incrementCharacterIndexAtom = atom(
  get => get(characterIndexAtom),
  (get, set) => set(characterIndexAtom, get(characterIndexAtom) + 1)
)

export const decrementCharacterIndexAtom = atom(
  get => get(characterIndexAtom),
  (get, set) => set(characterIndexAtom, get(characterIndexAtom) - 1)
)

export const resetCharacterIndexAtom = atom(
  get => get(characterIndexAtom),
  (get, set) => set(characterIndexAtom, 0)
)

export const incrementWordIndexAtom = atom(
  get => get(wordIndexAtom),
  (get, set) => set(wordIndexAtom, get(wordIndexAtom) + 1)
)

export const decrementWordIndexAtom = atom(
  get => get(wordIndexAtom),
  (get, set) => set(wordIndexAtom, get(wordIndexAtom) - 1)
)

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

export const getCurrentCharacterAtom = atom(
  get => get(wordsAtom)[get(wordIndexAtom)].characters[get(characterIndexAtom)]
)

export const updateCharacterAtom = atom(
  get => get(wordsAtom),
  (get, set, { className }) => {
    const words = get(wordsAtom)
    const wordIndex = get(wordIndexAtom)
    const character = get(getCurrentCharacterAtom)
    const characters = words[wordIndex].characters

    // replace character with updated character
    const updatedCharacters = characters.map((character, index) =>
      index === get(characterIndexAtom) ? { ...character, className } : character
    )

    return set(wordsAtom, {
      ...words,
      [wordIndex]: {
        ...words[wordIndex],
        characters: updatedCharacters,
      },
    })
  }
)

export const wordHeightAtom = atomWithReset<number>(0)

export const fontSizeAtom = atom<number>(1.5)

export const loadingAtom = atomWithReset<boolean>(true)

export const newWordsAtom = atomWithReset<WordType[]>([])

export const caretCutOffAtom = atomWithReset<number>(0)

export const timeAtom = atomWithReset<number>(0)

export const testStartedAtom = atomWithReset<boolean>(false)

export const testFinishedAtom = atomWithReset<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const currentWordElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const currentExtraCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const copyCurrentExtraCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const currentCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const copyCurrentCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const caretPositionAtom = atomWithReset<{
  top: number
  left: number
}>({
  top: 0,
  left: 0,
})

export const resetAtoms = [
  characterIndexAtom,
  // wordsAtom,
  loadingAtom,
  newWordsAtom,
  timeAtom,
  testStartedAtom,
  testFinishedAtom,
  caretPositionAtom,
]
