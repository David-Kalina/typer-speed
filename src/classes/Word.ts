import { Character } from './Character'

export class Word {
  public className
  constructor(public characters: Character[] = [], public extraCharacters: Character[] = [], public id: number) {
    this.characters = characters
    this.extraCharacters
    this.id = id
    this.className = 'default'
  }
}
