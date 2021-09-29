import { Flex, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'

interface WordsDisplayProps {}

const WordsDisplay: React.FC<WordsDisplayProps> = () => {
  const [words, setWords] = React.useState({
    currentWords: [],
    nextWords: [],
  })

  const [wordIndex, setWordIndex] = React.useState(0)

  React.useEffect(() => {
    socket.on('sendWords', ({ currentWords, nextWords }) => setWords({ currentWords, nextWords }))
    socket.on('sendWordIndex', ({ wordIndex }) => setWordIndex(wordIndex))
  }, [])

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
        {words.currentWords?.map((x, idx) => (
          <Text
            border={idx === wordIndex ? '1px solid yellow' : undefined}
            p="0.2rem"
            h="min-content"
            mx="0.1rem"
            my="0.1rem"
            w="max-content"
          >
            {x}
          </Text>
        ))}
      </Flex>
      <Flex w="100%" fontSize="xl">
        {words.nextWords?.map(x => (
          <Text p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
            {x}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default WordsDisplay
