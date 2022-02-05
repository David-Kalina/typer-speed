import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import KeyHandler from './KeyHandler'
import NewTest from './NewTest'
import StatChart from './StatChart'
import WordsDisplay from './WordsDisplay'
import { useEmitSocketEvent } from '../hooks/useSocketEvent'

function TypingTest() {
  useEmitSocketEvent('init')

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
