import { Flex, Icon } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import * as React from 'react'
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
} from '../store'

const StartTest: React.FC = () => {
  const [socket] = useAtom(socketAtom)
  const resetWordIndex = useResetAtom(wordIndexAtom)
  const resetCharacterIndex = useResetAtom(characterIndexAtom)
  const resetWordHeight = useResetAtom(wordHeightAtom)
  const resetWordOffset = useResetAtom(wordOffsetAtom)
  const resetWords = useResetAtom(wordsAtom)
  const resetNewWords = useResetAtom(newWordsAtom)
  const [, resetCaret] = useAtom(caretOffsetAtom)

  const handleClick = () => {
    resetWordIndex()
    resetCharacterIndex()
    resetWordHeight()
    resetWordOffset()
    resetCaret()
    resetWords()
    resetNewWords()
    socket.emit('init')
  }

  return (
    <Flex>
      <Icon cursor="pointer" as={VscDebugRestart} w="200px" fontSize="lg" onClick={handleClick} mt="1rem" mx="auto" />
    </Flex>
  )
}

export default StartTest
