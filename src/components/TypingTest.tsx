import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { loadingAtom, socketAtom, testFinishedAtom, wordsAtom } from '../store'
import { WordType } from '../types'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  const [socket] = useAtom(socketAtom)
  const [finished, setFinished] = useAtom(testFinishedAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const setWords = useUpdateAtom(wordsAtom)


  useEffect(() => {
    socket.on('words', (words: WordType[]) => {
      setWords(words)
      setLoading(false)
    })

    return () => {
      socket.off('words')
    }
  })

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
          <Countdown />
          {finished ? (
            <Results />
          ) : (
            <WordManagerWrapper>
              <WordManager />
            </WordManagerWrapper>
          )}
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
