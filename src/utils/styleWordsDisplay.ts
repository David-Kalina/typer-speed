import { shakeAnimation } from '../animations/shake'
import { bounceAnimation } from '../animations/bounce'

export const styleWordsDisplay = (
  idx: number,
  correctWords: number[],
  incorrectWords: number[],
  currentWordCorrect: boolean,
  wordIndex: number
) => {
  if (correctWords.includes(idx)) {
    return { color: 'black', animation: bounceAnimation, bg: '#9ae6b4' }
  }
  if (incorrectWords.includes(idx)) {
    return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
  }
  if (currentWordCorrect === false && wordIndex === idx) {
    return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
  }
  if (wordIndex === idx) {
    return { color: 'black', animation: undefined, bg: '#faf089' }
  }
}
