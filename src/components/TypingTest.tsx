import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { useLocation } from 'react-location'
import { fontSizeAtom, themeAtom } from '../store/themeAtoms'
import { resetTypingTestAtom, testFinishedAtom, testTimeAtom } from '../store/typingTestAtoms'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  const [testFinished] = useAtom(testFinishedAtom)
  const [fontSize] = useAtom(fontSizeAtom)
  const [time] = useAtom(testTimeAtom)
  const [theme] = useAtom(themeAtom)
  const reset = useUpdateAtom(resetTypingTestAtom)
  const {
    current: { pathname },
  } = useLocation()

  useEffect(() => {
    reset()
  }, [fontSize, time, theme, reset, pathname])

  return (
    <Flex flexDir="column" w="100%" className="typing-test" fontSize={`${fontSize}em`} mt={['2em', 0]}>
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
