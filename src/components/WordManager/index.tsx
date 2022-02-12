import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { wordsAtom } from '../../store'
import NewWordsManager from '../NewWordsManager'
import Word from '../Word/index'

function Index() {
  const [words] = useAtom(wordsAtom)

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
