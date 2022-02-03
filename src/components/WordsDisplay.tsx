import { Flex, Text } from '@chakra-ui/layout'
import { Box, Spinner } from '@chakra-ui/react'
import * as React from 'react'
import { useSocketEvent } from '../hooks/useSocketEvent'
import { styleWordsDisplay } from '../utils/styleWordsDisplay'
import Timer from './Timer'
import Word from './Word'

const WordsDisplay: React.FC = () => {
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

  useSocketEvent('sendAccuracyWords', ({ errorWords, correctWords }) => {
    setAccuracyWords(prev => ({
      correctWords: [...prev.correctWords, correctWords],
      errorWords: [...prev.errorWords, errorWords],
    }))
  })

  useSocketEvent('defaultStyle', wordIndex => {
    setAccuracyWords(prev => ({
      correctWords: prev.correctWords,
      errorWords: prev.errorWords.filter(x => x !== wordIndex),
    }))
  })

  useSocketEvent('resetAccuracyWords', () => {
    setAccuracyWords({ errorWords: [], correctWords: [] })
  })

  useSocketEvent('sendWordIndex', ({ wordIndex }) => {
    setWordIndex(wordIndex)
  })

  useSocketEvent('resetWordIndex', () => {
    setWordIndex(0)
  })

  useSocketEvent('sendWords', ({ currentWords, nextWords }) => {
    setWords({ currentWords, nextWords })
  })

  useSocketEvent('sendCurrentWordCorrect', currentWordCorrect =>
    setCurrentWordCorrect(currentWordCorrect)
  )

  if (words.currentWords.length && words.nextWords.length) {
    return (
      <Flex h="max" wrap="wrap" justifyContent="flex-start" borderRadius="md">
        <Box h="22px" w={['100%', '100%', '22px']} textAlign="center">
          <Timer />
        </Box>
        <Flex
          mt={['2', '2', 'unset']}
          w={['80%', '80%', '100%']}
          mx="auto"
          fontSize={['lg', 'xl', '2xl']}
          wrap="wrap"
        >
          {words?.currentWords?.map((x, idx) => {
            const style = styleWordsDisplay(idx, accuracyWords, currentWordCorrect, wordIndex)
            return <Word key={idx} style={style as any} text={x} idx={idx} />
          })}
        </Flex>
        <Flex w={['80%', '80%', '100%']} mx="auto" fontSize={['lg', 'xl', '2xl']} wrap="wrap">
          {words.nextWords?.map(x => (
            <Text key={x} p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
              {x}
            </Text>
          ))}
        </Flex>
      </Flex>
    )
  } else {
    return (
      <Flex h="102px">
        <Spinner mx="auto" />
      </Flex>
    )
  }
}

export default WordsDisplay
