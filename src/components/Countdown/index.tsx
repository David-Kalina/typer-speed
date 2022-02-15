import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { testStartedAtom } from '../../store'

function Index() {
  const [time, setTime] = useState(10)
  const [testStarted, setTestStarted] = useAtom(testStartedAtom)

  useEffect(() => {
    const interval = setInterval(() => {
      if (testStarted)
        setTime(() => {
          if (time === 0) {
            setTestStarted(false)
            return time
          }
          return time - 1
        })
    }, 1000)
    return () => clearInterval(interval)
  }, [setTestStarted, testStarted, time])

  return (
    <Text fontSize="1.5em" minH="1.5em" pl="0.5rem" color="brand.200">
      {time && testStarted ? `${time}s` : null}
    </Text>
  )
}

Index.displayName = 'Countdown'

export default Index
