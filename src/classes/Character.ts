export class Character {
  constructor(
    public value: string,
    public id: string,
    public wordId: number,
    public word: string,
    public className: string = 'default'
  ) {
    this.value = value
    this.id = id
    this.className = className
  }
}
