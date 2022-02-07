import { Flex, Text } from '@chakra-ui/layout'
import { Box, Spinner } from '@chakra-ui/react'
import * as React from 'react'
import { useSocketEvent } from '../hooks/useSocketEvent'
import { styleWordsDisplay } from '../utils/styleWordsDisplay'
import Timer from './Timer'
import Word from './Word'

const WordsDisplay: React.FC = () => {
  const [correctWords, setCorrectWords] = React.useState<number[]>([])
  const [incorrectWords, setIncorrectWords] = React.useState<number[]>([])
  const [currentWordCorrect, setCurrentWordCorrect] = React.useState(true)
  const [wordIndex, setWordIndex] = React.useState(0)
  const [words, setWords] = React.useState({
    currentWords: [],
    nextWords: [],
  })

  useSocketEvent('correctWords', (data: number[]) => {
    setCorrectWords(data)
  })

  useSocketEvent('incorrectWords', (data: number[]) => {
    setIncorrectWords(data)
  })

  useSocketEvent('defaultStyle', wordIndex => {
    setCorrectWords(prev => [...prev])
  })

  useSocketEvent('defaultStyle', wordIndex => {
    setIncorrectWords(prev => [...prev.filter(x => x !== wordIndex)])
  })

  useSocketEvent('resetCorrectWords', () => {
    setCorrectWords([])
  })

  useSocketEvent('resetIncorrectWords', () => {
    setIncorrectWords([])
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

  useSocketEvent('sendCurrentWordCorrect', currentWordCorrect => setCurrentWordCorrect(currentWordCorrect))

  if (words.currentWords.length && words.nextWords.length) {
    return (
      <Flex h="max" wrap="wrap" justifyContent="flex-start">
        <Box h="30px" w={['100%', '100%', '30px']} textAlign="center">
          <Timer />
        </Box>
        <Flex mt={['2', '2', 'unset']} w={['80%', '80%', '100%']} mx="auto" fontSize={['lg', 'xl', '2xl']} wrap="wrap">
          {words?.currentWords?.map((x, idx) => {
            const style = styleWordsDisplay(idx, correctWords, incorrectWords, currentWordCorrect, wordIndex)
            return <Word key={idx} style={style as any} text={x} idx={idx} />
          })}
        </Flex>
        <Flex w={['80%', '80%', '100%']} mx="auto" fontSize={['lg', 'xl', '2xl']} wrap="wrap">
          {words.nextWords?.map((x, idx) => (
            <Text key={idx} p="0.2rem" h="min-content" mx="0.1rem" my="0.1rem" w="max-content">
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
