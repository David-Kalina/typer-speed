import { Flex, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'
import { shakeAnimation } from '../animations/shake'
import { bounceAnimation } from '../animations/bounce'
import Timer from './Timer'
import { Box } from '@chakra-ui/react'

interface WordsDisplayProps {}

const WordsDisplay: React.FC<WordsDisplayProps> = () => {
  const [words, setWords] = React.useState({
    currentWords: [],
    nextWords: [],
  })

  const [accuracyWords, setAccuracyWords] = React.useState<{
    correctWords: number[]
    errorWords: number[]
  }>({
    errorWords: [],
    correctWords: [],
  })

  const [currentWordCorrect, setCurrentWordCorrect] = React.useState(true)

  const [wordIndex, setWordIndex] = React.useState(0)

  React.useEffect(() => {
    socket.on('sendAccuracyWords', ({ errorWords, correctWords }) =>
      setAccuracyWords(prev => ({
        correctWords: [...prev.correctWords, correctWords],
        errorWords: [...prev.errorWords, errorWords],
      }))
    )
  }, [])

  React.useEffect(() => {
    socket.on('defaultStyle', wordIndex => {
      setAccuracyWords(prev => ({
        correctWords: prev.correctWords,
        errorWords: prev.errorWords.filter(x => x !== wordIndex),
      }))
    })
  }, [])

  React.useEffect(() => {
    socket.on('resetAccuracyWords', () => setAccuracyWords({ errorWords: [], correctWords: [] }))
  }, [])

  React.useEffect(() => {
    socket.on('sendWordIndex', ({ wordIndex }) => setWordIndex(wordIndex))
  }, [])

  React.useEffect(() => {
    socket.on('resetWordIndex', () => setWordIndex(0))
  }, [])

  React.useEffect(() => {
    socket.on('sendWords', ({ currentWords, nextWords }) => {
      setWords({ currentWords, nextWords })
    })
  }, [])

  React.useEffect(() => {
    socket.on('sendCurrentWordCorrect', currentWordCorrect =>
      setCurrentWordCorrect(currentWordCorrect)
    )
  }, [])

  const returnStyle = (idx: number) => {
    if (accuracyWords.correctWords.includes(idx)) {
      return { color: 'black', animation: bounceAnimation, bg: '#9ae6b4' }
    }
    if (accuracyWords.errorWords.includes(idx)) {
      return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
    }
    if (currentWordCorrect === false && wordIndex === idx) {
      return { color: 'black', animation: shakeAnimation, bg: '#feb2b2' }
    }
    if (wordIndex === idx) {
      return { color: 'black', animation: undefined, bg: '#faf089' }
    }
  }

  return (
    <Flex
      h="max"
      wrap="wrap"
      // bg="#2c323d"
      justifyContent="flex-start"
      borderRadius="md"
    >
      <Box h="20px" w="20px">
        <Timer />
      </Box>
      <Flex w="100%" fontSize={['lg', 'lg', 'xl']} wrap="wrap">
        {words?.currentWords?.map((x, idx) => {
          const style = returnStyle(idx)
          return (
            <Text
              key={idx}
              borderRadius="sm"
              p="0.2rem"
              bg={style?.bg}
              animation={style?.animation}
              color={style?.color}
              h="min-content"
              mx="0.1rem"
              my="0.1rem"
              w="max-content"
            >
              {x}
            </Text>
          )
        })}
      </Flex>
      <Flex w="100%" fontSize={['lg', 'lg', 'xl']} wrap="wrap" wordBreak="break-all">
        {words.nextWords?.map(x => (
          <Text key={x} p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
            {x}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default WordsDisplay
