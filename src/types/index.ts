export interface Character {
  className: string
  value: string
  id: string
  wordId: number
  word: string
  index: number
}

export interface WordType {
  characters: Character[]
  id: number
  className: string
}
