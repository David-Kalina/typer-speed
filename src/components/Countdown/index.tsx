import { Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketAtom, testStartedAtom, timeAtom } from '../../store'

function Index() {
  const [time, setTime] = useAtom(timeAtom)
  const [socket] = useAtom(socketAtom)
  const [testStarted] = useAtom(testStartedAtom)

  useEffect(() => {
    if (testStarted) socket.emit('startTimer')
  }, [socket, testStarted])

  useEffect(() => {
    socket.on('tick', time => {
      setTime(time)
    })
    return () => {
      socket.off('timerTick')
    }
  }, [setTime, socket])

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
