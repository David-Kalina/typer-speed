import { Flex, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { socket } from '../contexts/SocketContext'
import { shakeAnimation } from '../animations/shake'
import { bounceAnimation } from '../animations/bounce'

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
    console.log('Accuracy')

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
    socket.on('resetAccuracyWords', () => setAccuracyWords({ correctWords: [], errorWords: [] }))
  }, [])

  React.useEffect(() => {
    socket.on('sendWords', ({ currentWords, nextWords }) => setWords({ currentWords, nextWords }))
  }, [])

  React.useEffect(() => {
    socket.on('sendCurrentWordCorrect', currentWordCorrect =>
      setCurrentWordCorrect(currentWordCorrect)
    )
  }, [])

  React.useEffect(() => {
    console.log(currentWordCorrect)
  }, [currentWordCorrect])

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
            borderRadius="sm"
            p="0.2rem"
            bg={returnStyle(idx)?.bg}
            animation={returnStyle(idx)?.animation}
            color={returnStyle(idx)?.color}
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
