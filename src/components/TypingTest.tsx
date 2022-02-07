import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useTime } from '../contexts/TimeContext'
import { useEmitSocketEvent } from '../hooks/useSocketEvent'
import KeyHandler from './KeyHandler'
import NewTest from './NewTest'
import StatChart from './StatChart'
import WordsDisplay from './WordsDisplay'

function TypingTest() {
  const [time] = useTime()
  useEmitSocketEvent('init', time)

  return (
    <>
      <WordsDisplay />
      <KeyHandler />
      <Flex>
        <NewTest />
      </Flex>

      <StatChart />
    </>
  )
}

export default TypingTest
