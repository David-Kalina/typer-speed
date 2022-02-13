import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { testStartedAtom, timeAtom } from '../../store'

function Index() {
  const [time, setTime] = useAtom(timeAtom)
  const [testStarted] = useAtom(testStartedAtom)

  if (time) {
    return (
      <Text fontSize="1.5em" minH="1.5em" pl="0.5em" color="brand.200">
        {time}
      </Text>
    )
  } else {
    return <Text fontSize="1.5em" minH="1.5em" pl="0.5em" color="brand.200" />
  }
}

Index.displayName = 'Countdown'

export default Index
