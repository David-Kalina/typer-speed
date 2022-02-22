export const fonts = {
  0: 'Roboto Mono',
  1: 'VT323',
  2: 'Ubuntu Mono',
  3: 'Suravaram',
  4: 'Laila',
  5: 'Harmattan',
  6: 'Noto Sans',
  7: 'Lateef',
  8: 'Cousine',
  9: 'Cantarell',
  10: 'Cardo',
  11: 'Space Mono',
}

export const fontSizes = {
  1: 'small',
  2: 'medium',
  3: 'large',
  4: 'huge',
}

type CharacterOptions = {
  [key: number]: {
    name: 'default' | 'correct' | 'incorrect' | 'missed'
    type: 'text' | 'color'
    label: string
  }
}

export const characterOptions: CharacterOptions = {
  1: {
    name: 'default',
    type: 'color',
    label: 'Default Character',
  },
  2: {
    name: 'correct',
    type: 'color',
    label: 'Correct Character',
  },
  3: {
    name: 'incorrect',
    type: 'color',
    label: 'Incorrect Character',
  },
  4: {
    name: 'missed',
    type: 'color',
    label: 'Missed Character',
  },
}
