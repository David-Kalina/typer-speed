import { Flex, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface WordsDisplayProps {}

const WordsDisplay: React.FC<WordsDisplayProps> = () => {
  const [words, setWords] = React.useState({
    currentWords: [{ word: '', correct: null, idx: 0 }],
    nextWords: [{ word: '', correct: null, idx: 0 }],
  })
  socket.on('sendWords', ({ currentWords, nextWords }) => setWords({ currentWords, nextWords }))

  return (
    <Flex
      h="max"
      p="2rem"
      pb="3rem"
      boxShadow="lg"
      wrap="wrap"
      bg="#2c323d"
      justifyContent="flex-start"
      borderRadius="md"
    >
      <Flex w="100%" fontSize="xl">
        {words.currentWords?.map(x => (
          <Text p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
            {x.word}
          </Text>
        ))}
      </Flex>
      <Flex w="100%" fontSize="xl">
        {words.nextWords?.map(x => (
          <Text p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
            {x.word}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default WordsDisplay
