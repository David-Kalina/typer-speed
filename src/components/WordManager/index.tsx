import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketAtom, wordsAtom } from '../../store'
import { WordType } from '../../types'
import Word from '../Word/index'

function Index() {
  const [socket] = useAtom(socketAtom)
  const [words, setWords] = useAtom(wordsAtom)

  const renderWords = words.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} />
  })

  useEffect(() => {
    socket.on('words', (words: WordType[]) => setWords(words))
  }, [])

  useEffect(() => {
    console.log(words)
  }, [words])

  return (
    <>
      <Flex
        flexWrap="wrap"
        alignContent="flex-start"
        height="calc(5 * 1em)"
        overflow="hidden"
        mx="auto"
        pb="1em"
        w="100%"
      >
        {renderWords}
      </Flex>
    </>
  )
}

export default Index
