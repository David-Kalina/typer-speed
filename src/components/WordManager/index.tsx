import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { socketAtom, wordsAtom } from '../../store'
import { WordType } from '../../types'
import NewWordsManager from '../NewWordsManager'
import Word from '../Word/index'

function Index() {
  const [socket] = useAtom(socketAtom)
  const [words, setWords] = useAtom(wordsAtom)

  useEffect(() => {
    socket.on('words', (words: WordType[]) => setWords(words))
  }, [setWords, socket])

  const renderWords = words?.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} />
  })

  return (
    <Flex
      flexWrap="wrap"
      alignContent="flex-start"
      mx="auto"
      paddingBottom="1em"
      height="6.75rem"
      className="word-manager"
      boxSizing="border-box"
      w="100%"
    >
      {renderWords}
      <NewWordsManager />
    </Flex>
  )
}

export default Index
