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
      <Text fontSize="md" pl="0.5em" minHeight="30px">
        {time}
      </Text>
    )
  } else {
    return <Text fontSize="md" pl="0.5em" minHeight="30px" />
  }
}

export default Index
