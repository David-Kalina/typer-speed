import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React, { useState } from 'react'
import { socketAtom, wordOffsetAtom } from '../../store'
import { WordType } from '../../types'
import Character from '../Character'

function Index({ characters, id }: WordType) {
  const [socket] = useAtom(socketAtom)
  const setWordOffset = useUpdateAtom(wordOffsetAtom)
  const ref = React.useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(false)

  React.useEffect(() => {
    socket.on(`${id}`, wordId => {
      if (wordId === id) {
        setCurrent(true)
      }
      if (ref.current) {
        setWordOffset({
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft,
        })
      }
    })
  }, [])

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  return (
    <Flex ref={current ? ref : undefined} m="0.25em" borderBottom="2px solid transparent" lineHeight="2rem">
      {renderCharacters}
    </Flex>
  )
}

export default Index
