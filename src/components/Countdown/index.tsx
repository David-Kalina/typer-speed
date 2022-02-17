import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { getCharactersByStatusAtom } from '../../store/characterAtoms'
import { addToResultsAtom } from '../../store/resultsAtoms'
import { testFinishedAtom, testStartedAtom, themeAtom } from '../../store/typingTestAtoms'

function Index() {
  const [duration, setDuration] = useState(120)
  const [elapsed, setElapsed] = useState(0)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const [, getCharactersByStatus] = useAtom(getCharactersByStatusAtom)
  const [, addToResults] = useAtom(addToResultsAtom)
  const [, setTestFinished] = useAtom(testFinishedAtom)
  const [theme] = useAtom(themeAtom)

  useEffect(() => {
    const interval = setInterval(() => {
      if (testStarted) {
        setElapsed(elapsed => elapsed + 1)
        setDuration(duration => duration - 1)
        if (elapsed > 0)
          addToResults({
            testTime: duration,
            seconds: elapsed,
            correct: getCharactersByStatus({ status: 'correct' }).length,
            incorrect: getCharactersByStatus({ status: 'incorrect' }).length,
            wordsMissed: getCharactersByStatus({ status: 'incorrect' }).map((c: { word: any }) => c.word),
            charactersMissed: getCharactersByStatus({ status: 'incorrect' }).map((c: { value: any }) => c.value),
          })
        console.log(getCharactersByStatus({ status: 'incorrect' }))
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [addToResults, duration, elapsed, getCharactersByStatus, setTestStarted, testStarted])

  useEffect(() => {
    if (duration === 0) {
      setTestStarted(false)
      setTestFinished(true)
    }
  }, [duration, setTestFinished, setTestStarted])

  return (
    <Text fontSize="1.5em" minH="1.5em" pl="0.5rem" color={`${theme}.300`}>
      {duration && testStarted ? `${duration}s` : null}
    </Text>
  )
}

Index.displayName = 'Countdown'

export default Index
