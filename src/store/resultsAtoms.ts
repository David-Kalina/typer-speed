import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

interface ResultType {
  testTime: number
  seconds: number
  correct: number
  incorrect: number
  // wordsMissed: string[]
  // charactersMissed: string[]
}

export const resultsAtom = atomWithReset<ResultType[]>([])

export const addToResultsAtom = atom(null, (get, set, dataEntry: ResultType) =>
  set(resultsAtom, [...get(resultsAtom), dataEntry])
)

export const getRecapDataAtom = atom(get => {
  const results = get(resultsAtom)

  return results.map((item: { seconds: number; correct: number; incorrect: any }) => {
    return {
      seconds: item.seconds,
      wpm: Math.round(item.correct / 4.7 / (item.seconds / 60)),
      incorrect: item.incorrect,
    }
  })
})

export const getWPMDataAtom = atom(get => {
  const results = get(resultsAtom)

  const wpmData = results.map((item: { seconds: number; correct: number; incorrect: any }) => {
    return {
      seconds: item.seconds,
      wpm: Math.round(item.correct / 4.7 / (item.seconds / 60)),
    }
  })

  const totalWPM = wpmData.reduce((acc, item) => acc + item.wpm, 0)
  return {
    wpm: Math.round(totalWPM / wpmData.length),
  }
})

export const getAccuracyDataAtom = atom(get => {
  const results = get(resultsAtom)

  const accuracyData = results.map((item: { seconds: number; correct: number; incorrect: any }) => {
    return {
      seconds: item.seconds,
      accuracy: Math.round((item.correct / (item.correct + item.incorrect)) * 100),
    }
  })

  const totalAccuracy = accuracyData.reduce((acc, item) => acc + item.accuracy, 0)
  return {
    accuracy: Math.round(totalAccuracy / accuracyData.length),
  }
})

// export const getMostMissedWordAtom = atom(get => {
//   const results = get(resultsAtom)

//   let count = 0

//   const mostMissedWord = results.reduce((acc, item) => {
//     const mostMissed = item.wordsMissed.reduce((acc, word) => {
//       if (acc.length < word.length) {
//         return word
//       }
//       return acc
//     }, '')

//     count = mostMissed.length
//     return mostMissed.length > acc.length ? mostMissed : acc
//   }, '')

//   return { count, mostMissedWord }
// })

// export const getMostMissedCharacterAtom = atom(get => {
//   const results = get(resultsAtom)

//   let count = 0

//   const mostMissedCharacter = results.reduce((acc, item) => {
//     const mostMissed = item.charactersMissed.reduce((acc, character) => {
//       if (acc.length < character.length) {
//         return character
//       }
//       return acc
//     }, '')

//     count = mostMissed.length

//     return mostMissed.length > acc.length ? mostMissed : acc
//   }, '')

//   return { count, mostMissedCharacter }
// })
