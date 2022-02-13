import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { WordType } from '../../types'
import Character from '../Character'

const Index = React.memo(({ characters, extraCharacters }: WordType) => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOnScreen(ref)
  // const extraCharacters = useExtraCharacters(id)

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  const renderExtraCharacters = extraCharacters?.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  const allCharacters = [...renderCharacters, ...(renderExtraCharacters || [])]

  return (
    <Flex ref={ref} className="word">
      {allCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
