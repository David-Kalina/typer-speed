import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { socketAtom, wordOffsetAtom } from '../../store'
import { WordType } from '../../types'
import Character from '../Character'

const Index = React.memo(({ characters, id }: WordType) => {
  const [socket] = useAtom(socketAtom)
  const setWordOffset = useUpdateAtom(wordOffsetAtom)
  const ref = React.useRef<HTMLDivElement>(null)

  socket.on(`${id}`, wordId => {
    if (wordId === id) {
      setWordOffset({
        top: ref.current?.offsetTop || 0,
        left: ref.current?.offsetLeft || 0,
      })
    }
  })

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  return (
    <Flex ref={ref} m="0.25em" borderBottom="2px solid transparent" lineHeight="2rem">
      {renderCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
