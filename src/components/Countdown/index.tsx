import { Text } from '@chakra-ui/react'
import { time } from 'console'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { addToResultsAtom, getCharactersByClassNameAtom, testFinishedAtom, testStartedAtom } from '../../store'

function Index() {
  const [duration, setDuration] = useState(15)
  const [elapsed, setElapsed] = useState(0)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)
  const [, getCharactersByClassName] = useAtom(getCharactersByClassNameAtom)
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
            correct: getCharactersByClassName({ className: 'correct' }).length,
            incorrect: getCharactersByClassName({ className: 'incorrect' }).length,
          })
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [addToResults, duration, elapsed, getCharactersByClassName, setTestStarted, testStarted])

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
