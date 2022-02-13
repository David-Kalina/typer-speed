import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useExtraCharacters } from '../../hooks/useExtraCharacters'
import { useOnScreen } from '../../hooks/useOnScreen'
import { WordType } from '../../types'
import Character from '../Character'
import ExtraCharacter from '../ExtraCharacter'

const Index = React.memo(({ characters, id }: WordType) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOnScreen(ref)

  const extraCharacters = useExtraCharacters(id)

  console.log('render')

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  const renderExtraCharacters = extraCharacters?.map(({ className, value, id, wordId, word }) => {
    return (
      <ExtraCharacter id={id} word={word} wordId={wordId} key={id} className={className} value={value}></ExtraCharacter>
    )
  })

  const allCharacters = [...renderCharacters, ...renderExtraCharacters]

  return (
    <Flex ref={ref} className="word">
      {allCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
