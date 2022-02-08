import { Flex } from '@chakra-ui/react'
import React from 'react'
import { WordManagerProps } from '../../types'
import Word from '../Word/index'

function Index({ words }: WordManagerProps) {
  const renderWords = words.map(({ className, characters, id }) => {
    return <Word id={id} key={id} className={className} characters={characters} />
  })

  return (
    <>
      <Flex flexWrap="wrap" alignContent="flex-start" mx="auto" h="160px" pb="16px" w="100%">
        {renderWords}
      </Flex>
    </>
  )
}

export default Index
