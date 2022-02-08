export interface Character {
  className: string
  value: string
  id: number
  wordId: number
  word: string
}

export interface Word {
  characters: Character[]
  id: number
  className: string
}

export interface WordManagerProps {
  words: Word[]
}
