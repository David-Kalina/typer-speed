import { addDoc, doc, increment, setDoc } from 'firebase/firestore'
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { db, testsRef } from '../firebase'
import { userAtom } from './firebaseAtoms'
import { testIdAtom } from './typingTestAtoms'

interface ResultType {
  testTime: number
  seconds: number
  correct: number
  incorrect: number
  missed: number
  extra: number
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

  const wpmData = results.map(
    (item: { seconds: number; correct: number; incorrect: any; missed: number; extra: number }) => {
      return {
        seconds: item.seconds,
        wpm: Math.round(item.correct / 4.7 / (item.seconds / 60)),
      }
    }
  )

  const totalWPM = wpmData.reduce((acc, item) => acc + item.wpm, 0)
  return {
    wpm: Math.round(totalWPM / wpmData.length),
  }
})

export const getAccuracyDataAtom = atom(get => {
  const results = get(resultsAtom)

  const accuracyData = results.map(
    (item: { seconds: number; correct: number; incorrect: number; missed: number; extra: number }) => {
      return {
        seconds: item.seconds,
        accuracy: Math.round((item.correct / (item.correct + item.incorrect + item.extra + item.missed)) * 100),
      }
    }
  )

  const totalAccuracy = accuracyData.reduce((acc, item) => acc + item.accuracy, 0)
  return {
    accuracy: Math.round(totalAccuracy / accuracyData.length),
  }
})

export const addToFirebaseResultAtom = atom(null, async get => {
  const user = get(userAtom)
  const accuracy = get(getAccuracyDataAtom)
  const wpm = get(getWPMDataAtom)
  const recap = get(getRecapDataAtom)
  const seconds = get(resultsAtom).length + 1
  const testId = get(testIdAtom)

  await addDoc(testsRef, {
    testId,
    email: user?.email,
    recap: recap,
    wpm: wpm.wpm,
    accuracy: accuracy.accuracy,
    seconds: seconds,
    date: {
      seconds: Date.now() / 1000,
      nanoseconds: Date.now() / 1000000,
    },
  }).catch(err => console.log(err))

  const statsRef = doc(db, 'stats', user?.email as string)

  await setDoc(
    statsRef,
    {
      testsTaken: increment(1),
      testsCompleted: increment(1),
      timeTyping: increment(seconds),
    },
    { merge: true }
  ).catch(err => console.log(err))
})

export const getResultsAtom = atom(get => {
  const accuracy = get(getAccuracyDataAtom).accuracy
  const wpm = get(getWPMDataAtom).wpm
  const recap = get(getRecapDataAtom)
  const seconds = get(resultsAtom).length
  const testId = get(testIdAtom)

  return {
    testId,
    recap,
    wpm,
    accuracy,
    seconds,
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
