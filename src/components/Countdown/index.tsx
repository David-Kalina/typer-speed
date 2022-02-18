import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { getCharactersByStatusAtom } from '../../store/characterAtoms'
import { addToResultsAtom } from '../../store/resultsAtoms'
import {
  elapsedTimeAtom,
  testFinishedAtom,
  testStartedAtom,
  testTimeAtom,
  themeAtom,
} from '../../store/typingTestAtoms'

function Index() {
  const [duration] = useAtom(testTimeAtom)
  const [elapsed, setElapsed] = useAtom(elapsedTimeAtom)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const [, getCharactersByStatus] = useAtom(getCharactersByStatusAtom)
  const [, addToResults] = useAtom(addToResultsAtom)
  const [, setTestFinished] = useAtom(testFinishedAtom)
  const [theme] = useAtom(themeAtom)

  useEffect(() => {
    const interval = setInterval(() => {
      if (testStarted) {
        setElapsed(elapsed => elapsed + 1)
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
  }, [addToResults, duration, elapsed, getCharactersByStatus, setElapsed, setTestStarted, testStarted])

  useEffect(() => {
    if (elapsed > duration) {
      setElapsed(0)
      setTestStarted(false)
      setTestFinished(true)
    }
  }, [duration, elapsed, setElapsed, setTestFinished, setTestStarted])

  return (
    <Text fontSize="0.5em" minH="1.5em" pl="0.5rem" color={`${theme}.300`}>
      {duration && testStarted ? `${duration - elapsed}s` : null}
    </Text>
  )
}

Index.displayName = 'Countdown'

export default Index
