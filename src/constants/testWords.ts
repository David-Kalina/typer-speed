import { WordManagerProps } from '../types'

// 100 words

const text =
  `point point point point point point point point point point point point point point point point point point point point`.split(
    ' '
  )

export const testWords: WordManagerProps['words'] = text.map((word, index) => ({
  characters: word.split('').map((c, characterIndex) => ({
    className: 'default-char',
    value: c,
    id: characterIndex,
    wordId: index,
    word,
  })),
  id: index,
  className: 'default-word',
}))
