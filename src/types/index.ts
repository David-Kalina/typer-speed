export interface Character {
  className: string
  value: string
  id: string
  wordId: number
  word: string
}

export interface WordType {
  characters: Character[]
  extraCharacters: Character[]
  id: number
  className: string
}
