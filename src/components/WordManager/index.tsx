import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useWordManager } from '../../hooks/useWordManager'
import { extraCharactersAtom } from '../../store'
import NewWordsManager from '../NewWordsManager'
import Word from '../Word/index'

function Index() {
  const { words } = useWordManager()

  const [extraCharacters] = useAtom(extraCharactersAtom)

  const renderWords = words?.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} extraCharacters={extraCharacters[id]} />
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
