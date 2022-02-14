import randomWords from 'random-words'
import { Character } from '../classes/Character'

export interface CharactersAtom {
  [key: number]: { characters: Character[] }
}

export const generateWords = (count = 100, maxLength = 5, arrayLength?: number) => {
  const hashMap: CharactersAtom = {}

  const words = randomWords({ exactly: count, maxLength }).map((w: string, wIndex: number) => {
    return {
      characters: w
        .split('')
        .map(c => new Character(c, `${c}${new Date().getMilliseconds() * Math.random()}`, wIndex, w, 'default')),
    }
  })

  words.forEach((w, wIndex) => {
    hashMap[arrayLength ? arrayLength : wIndex] = w
  })

  return hashMap
}
