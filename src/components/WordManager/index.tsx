import { Flex } from '@chakra-ui/react'
import React from 'react'
import { WordType } from '../../types'
import NewWordsManager from '../NewWordsManager'
import Word from '../Word/index'

function Index({ words }: { words: WordType[] }) {
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

Index.displayName = 'WordManager'

export default Index
