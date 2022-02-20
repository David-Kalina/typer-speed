export class Character {
  constructor(
    public value: string,
    public id: string,
    public wordId: number,
    public word: string,
    public status: 'correct' | 'incorrect' | 'missed' | 'extra' | 'default'
  ) {
    this.value = value
    this.id = id
    this.status = status
  }
}
