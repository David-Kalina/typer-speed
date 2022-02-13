import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { useWords } from '../hooks/useWords'
import { loadingAtom, socketAtom, testFinishedAtom } from '../store'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  const [socket] = useAtom(socketAtom)
  const setFinished = useUpdateAtom(testFinishedAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const words = useWords()

  useEffect(() => {
    if (words.length) {
      setLoading(false)
    }
  }, [setLoading, words])

  useEffect(() => {
    socket.emit('init')
    setFinished(false)
  }, [setFinished, socket])

  useEffect(() => {
    socket.on('finishTimer', () => {
      setFinished(true)
    })
    return () => {
      socket.off('finishedTimer')
    }
  }, [setFinished, socket])

  return (
    <Flex flexDir="column" w="100%" className="typing-test">
      {!loading ? (
        <>
          <Results />
          <Countdown />
          <WordManagerWrapper>
            <WordManager words={words} />
          </WordManagerWrapper>
          <NewTest />
          <KeyManager />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Flex>
  )
}

export default TypingTest
