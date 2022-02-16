import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { getCharactersByStatusAtom } from '../../store/characterAtoms'
import { addToResultsAtom } from '../../store/resultsAtoms'
import { testFinishedAtom, testStartedAtom } from '../../store/typingTestAtoms'

function Index() {
  const [duration, setDuration] = useState(15)
  const [elapsed, setElapsed] = useState(0)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const [, getCharactersByStatus] = useAtom(getCharactersByStatusAtom)
  const [, addToResults] = useAtom(addToResultsAtom)
  const [, setTestFinished] = useAtom(testFinishedAtom)

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
          })
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
    <Text fontSize="1.5em" minH="1.5em" pl="0.5rem" color="brand.200">
      {duration && testStarted ? `${duration}s` : null}
    </Text>
  )
}

Index.displayName = 'Countdown'

export default Index
