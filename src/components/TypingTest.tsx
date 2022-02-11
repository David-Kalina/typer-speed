import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { socketAtom } from '../store'
import Countdown from './Countdown'
import KeyManager from './KeyManager'
import NewTest from './NewTest'
import Results from './Results'
import WordManager from './WordManager'
import WordManagerWrapper from './WordManagerWrapper'

function TypingTest() {
  const [socket] = useAtom(socketAtom)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    socket.emit('init')
    setFinished(false)
  }, [socket])

  useEffect(() => {
    socket.on('finishTimer', () => {
      setFinished(true)
    })
    return () => {
      socket.off('finishedTimer')
    }
  }, [socket])

  return (
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
  )
}

export default TypingTest
