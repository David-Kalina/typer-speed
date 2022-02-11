import { Flex, Icon } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import * as React from 'react'
import { useEffect } from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import {
  caretOffsetAtom,
  characterIndexAtom,
  socketAtom,
  wordHeightAtom,
  wordIndexAtom,
  wordOffsetAtom,
  wordsAtom,
  newWordsAtom,
  timeAtom,
  testStartedAtom,
  testFinishedAtom,
} from '../store'

const StartTest: React.FC = () => {
  const [socket] = useAtom(socketAtom)
  const resetWordIndex = useResetAtom(wordIndexAtom)
  const resetCharacterIndex = useResetAtom(characterIndexAtom)
  const resetWordHeight = useResetAtom(wordHeightAtom)
  const resetWordOffset = useResetAtom(wordOffsetAtom)
  const resetWords = useResetAtom(wordsAtom)
  const resetNewWords = useResetAtom(newWordsAtom)
  const resetTime = useResetAtom(timeAtom)
  const resetTestStarted = useResetAtom(testStartedAtom)
  const resetTestFinished = useResetAtom(testFinishedAtom)
  const [, resetCaret] = useAtom(caretOffsetAtom)

  const handleClick = React.useCallback(() => {
    resetWordIndex()
    resetCharacterIndex()
    resetWordHeight()
    resetWordOffset()
    resetCaret()
    resetWords()
    resetNewWords()
    resetTime()
    resetTestStarted()
    resetTestFinished()
    socket.emit('resetTimer')
    socket.emit('init')
  }, [
    resetWordIndex,
    resetCharacterIndex,
    resetWordHeight,
    resetWordOffset,
    resetCaret,
    resetWords,
    resetNewWords,
    socket,
    resetTime,
    resetTestStarted,
    resetTestFinished,
  ])

  useEffect(() => {
    socket.on('reset', handleClick)

    return () => {
      socket.off('reset')
    }
  }, [handleClick, socket])

  return (
    <Flex>
      <Icon
        cursor="pointer"
        as={VscDebugRestart}
        w="200px"
        fontSize="1.5em"
        onClick={handleClick}
        mt="1rem"
        mx="auto"
        color="white"
      />
    </Flex>
  )
}

export default StartTest
