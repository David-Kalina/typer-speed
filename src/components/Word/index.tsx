import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Word } from '../../classes/Word'
import { useOnScreen } from '../../hooks/useOnScreen'
import Character from '../Character'
import ExtraCharacter from '../ExtraCharacter'

const Index = React.memo(({ characters }: Word) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOnScreen(ref)

  const renderCharacters = characters
    .filter(c => c.status !== 'extra')
    .map(({ status, value, id, wordId, word }) => {
      return <Character id={id} word={word} wordId={wordId} key={id} value={value} status={status}></Character>
    })

  const renderExtraCharacters = characters
    .filter(c => c.status === 'extra')
    .map(({ value, id, wordId, word }) => {
      return <ExtraCharacter id={id} wordId={wordId} key={id} value={value} word={word} status="extra" />
    })

  return (
    <Flex ref={ref} className="word">
      {renderCharacters}
      {renderExtraCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
