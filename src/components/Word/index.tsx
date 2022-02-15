import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { WordType } from '../../types'
import Character from '../Character'
import ExtraCharacter from '../ExtraCharacter'

const Index = React.memo(({ characters }: WordType) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOnScreen(ref)

  const renderCharacters = characters
    .filter(c => c.className !== 'extra')
    .map(({ className, value, id, wordId, word }, index) => {
      return (
        <Character
          id={id}
          index={index}
          word={word}
          wordId={wordId}
          key={id}
          className={className}
          value={value}
        ></Character>
      )
    })

  const renderExtraCharacters = characters
    .filter(c => c.className === 'extra')
    .map(({ className, value, id, wordId, word }, index) => {
      return (
        <ExtraCharacter
          id={id}
          index={index}
          wordId={wordId}
          key={id}
          className={className}
          value={value}
          word={word}
        />
      )
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
