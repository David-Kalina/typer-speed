import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { Character } from '../classes/Character'
import { wordIndexAtom } from './wordAtoms'
import { wordsAtom } from './wordAtoms'

export const characterIndexAtom = atomWithReset<number>(0)

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

export const getCharactersByClassNameAtom = atom(
  () => '',
  (get, set, { className }: { className: string }) => {
    const words = Object.values(get(wordsAtom))
    const characters = words.reduce((acc, word) => {
      return [...acc, ...word.characters.filter((character: any) => character.className === className)]
    }, [])

    return characters
  }
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
