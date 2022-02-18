import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { themeAtom } from '../../store/typingTestAtoms'
import { wordsAtom } from '../../store/wordAtoms'
import Word from '../Word'

function Index() {
  const [words] = useAtom(wordsAtom)
  const [theme] = useAtom(themeAtom)

  const renderWords = Object.values(words).map((item, idx) => {
    return <Word id={idx} key={idx} className="word" characters={item.characters} />
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
    </Flex>
  )
}

Index.displayName = 'WordManager'

export default Index
