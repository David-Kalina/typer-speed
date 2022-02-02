import { shakeAnimation } from '../animations/shake'
import { bounceAnimation } from '../animations/bounce'

export const styleWordsDisplay = (
  idx: number,
  accuracyWords: { correctWords: number[]; errorWords: number[] },
  currentWordCorrect: boolean,
  wordIndex: number
) => {
  if (accuracyWords.correctWords.includes(idx)) {
    return { color: 'black', animation: bounceAnimation, bg: '#9ae6b4' }
  }
  if (accuracyWords.errorWords.includes(idx)) {
    return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
  }
  if (currentWordCorrect === false && wordIndex === idx) {
    return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
  }
  if (wordIndex === idx) {
    return { color: 'black', animation: undefined, bg: '#faf089' }
  }
}
