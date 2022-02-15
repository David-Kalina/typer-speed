import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import { Character } from './classes/Character'
import { WordType } from './types'
import { CharactersAtom, generateWords } from './utils/generateWords'

export const characterIndexAtom = atomWithReset<number>(0)

export const wordIndexAtom = atomWithReset<number>(0)

export const wordsAtom = atom<CharactersAtom>(generateWords(100, 5))

export const caretElementAtom = atom<HTMLDivElement | null>(null)

export const currentCharacterElementAtom = atom<HTMLDivElement | null>(null)

export const currentCharacterElementCopyAtom = atom<HTMLDivElement | null>(null)

// Character Atoms

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

export const getCurrentCharacterAtom = atom(
  get => get(wordsAtom)[get(wordIndexAtom)].characters[get(characterIndexAtom)]
)

export const updateCharacterAtom = atom(
  get => get(wordsAtom),
  (get, set, { className }) => {
    const words = get(wordsAtom)
    const wordIndex = get(wordIndexAtom)
    const characterIndex = get(characterIndexAtom)
    const characters = words[wordIndex].characters

    const updatedCharacters = characters.map((character, index) =>
      index === characterIndex ? { ...character, className } : character
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

export const updateCharactersAtom = atom(
  get => get(wordsAtom),
  (get, set, { className, replaceClassName, wordIndex }) => {
    const words = get(wordsAtom)
    const characters = words[wordIndex].characters

    const updatedCharacters = characters.map(character => {
      if (character.className === className) {
        return { ...character, className: replaceClassName }
      } else {
        return character
      }
    })

    return set(wordsAtom, {
      ...words,
      [wordIndex]: {
        ...words[wordIndex],
        characters: updatedCharacters,
      },
    })
  }
)

export const removeCharactersAtom = atom(
  get => get(wordsAtom),
  (get, set, { className }) => {
    const words = get(wordsAtom)
    const wordIndex = get(wordIndexAtom)
    const characters = words[wordIndex].characters

    const updatedCharacters = characters.filter(character => character.className !== className)

    return set(wordsAtom, {
      ...words,
      [wordIndex]: {
        ...words[wordIndex],
        characters: updatedCharacters,
      },
    })
  }
)

export const removeCharacterAtom = atom(
  get => get(wordsAtom),
  (get, set, { className }) => {
    const words = get(wordsAtom)
    const wordIndex = get(wordIndexAtom)
    const characters = words[wordIndex].characters

    const lastCharacter = characters[characters.length - 1]

    if (lastCharacter && lastCharacter.className === className) {
      return set(wordsAtom, {
        ...words,
        [wordIndex]: {
          ...words[wordIndex],
          characters: characters.slice(0, characters.length - 1),
        },
      })
    } else {
      return
    }
  }
)

export const addCharactersAtom = atom(
  get => get(wordsAtom),
  (get, set, key: string) => {
    const words = get(wordsAtom)
    const wordIndex = get(wordIndexAtom)

    const newCharacter = new Character(key, `extra-${Math.random()}${Math.sqrt(wordIndex)}`, wordIndex, '', 'extra')

    return set(wordsAtom, {
      ...words,
      [wordIndex]: {
        ...words[wordIndex],
        characters: [...words[wordIndex].characters, newCharacter],
      },
    })
  }
)

// Words Atoms

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

export const wordHeightAtom = atomWithReset<number>(0)

export const fontSizeAtom = atom<number>(2)

export const loadingAtom = atomWithReset<boolean>(true)

export const newWordsAtom = atomWithReset<WordType[]>([])

export const caretCutOffAtom = atomWithReset<number>(0)

export const testTime = atomWithReset<number>(15)

export const elapsedTimeAtom = atomWithReset<number>(0)

export const testStartedAtom = atomWithReset<boolean>(false)

export const setTestStartedAtom = atom(
  get => get(testStartedAtom),
  (get, set) => set(testStartedAtom, true)
)

export const testFinishedAtom = atomWithReset<boolean>(false)

export const testTimeAtom = atomWithStorage<number>('testTime', 0)

export const currentWordElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const currentExtraCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const copyCurrentExtraCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const copyCurrentCharacterElementAtom = atomWithReset<HTMLDivElement | null>(null)

export const caretPositionAtom = atomWithReset<{
  top: number
  left: number
}>({
  top: 0,
  left: 0,
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

export const resetAtoms = [
  characterIndexAtom,
  // wordsAtom,
  loadingAtom,
  newWordsAtom,
  testTimeAtom,
  testStartedAtom,
  testFinishedAtom,
  caretPositionAtom,
]

// Caret Atoms
