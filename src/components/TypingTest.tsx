import { Flex } from '@chakra-ui/react'
import React from 'react'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  return (
    <Flex flexDir="column" w="100%" className="typing-test">
      <>
        <Results />
        <Countdown />
        <WordManagerWrapper>
          <WordManager />
        </WordManagerWrapper>
        <NewTest />
        <KeyManager />
      </>
    </Flex>
  )
}

export default TypingTest
