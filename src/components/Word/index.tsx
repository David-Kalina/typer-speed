import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { WordType } from '../../types'
import Character from '../Character'
import ExtraCharacter from '../ExtraCharacter'

const Index = React.memo(({ characters }: WordType) => {
  const ref = React.useRef<HTMLDivElement>(null)

  console.log('rendering word')
  useOnScreen(ref)

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  // const renderExtraCharacters = extraCharacters?.map(({ className, value, id, wordId, word }) => {
  //   return (
  //     <ExtraCharacter id={id} word={word} wordId={wordId} key={id} className={className} value={value}></ExtraCharacter>
  //   )
  // })

  // const allCharacters = [...renderCharacters, ...(renderExtraCharacters || [])]

  return (
    <Flex ref={ref} className="word">
      {renderCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
