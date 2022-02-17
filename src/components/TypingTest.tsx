import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { fontSizeAtom, testFinishedAtom } from '../store/typingTestAtoms'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  const [testFinished] = useAtom(testFinishedAtom)
  const [fontSize] = useAtom(fontSizeAtom)

  return (
    <Flex flexDir="column" w="100%" className="typing-test" fontSize={`${fontSize}em`}>
      <>
        {testFinished ? (
          <Results />
        ) : (
          <>
            <Countdown />
            <WordManagerWrapper>
              <WordManager />
            </WordManagerWrapper>
            <KeyManager />
          </>
        )}
        <NewTest />
      </>
    </Flex>
  )
}

export default TypingTest
