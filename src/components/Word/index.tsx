import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { socketAtom, wordHeightAtom, wordOffsetAtom } from '../../store'
import { Character as CharacterType, WordType } from '../../types'
import Character from '../Character'
import ExtraCharacter from '../ExtraCharacter'

const Index = React.memo(({ characters, id }: WordType) => {
  const [socket] = useAtom(socketAtom)
  const setWordOffset = useUpdateAtom(wordOffsetAtom)
  const setWordHeight = useUpdateAtom(wordHeightAtom)
  const ref = React.useRef<HTMLDivElement>(null)
  const [extraCharacters, setExtraCharacters] = React.useState<CharacterType[]>([])

  useOnScreen(ref)

  React.useEffect(() => {
    socket.on(`${id}`, wordId => {
      if (wordId === id) {
        return setWordOffset({
          top: ref.current?.offsetTop || 0,
          left: ref.current?.offsetLeft || 0,
        })
      }
    })
  }, [id, socket])

  React.useEffect(() => {
    socket.on(`extra-${id}`, (character: CharacterType[]) => {
      setExtraCharacters([...extraCharacters, ...character])
    })
  }, [])

  React.useEffect(() => {
    if (ref.current) {
      const style = window.getComputedStyle(ref.current)
      const border = parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10)
      const margin = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
      const padding = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10)
      setWordHeight(ref.current.clientHeight + border + margin + padding)
    }
  }, [])

  const renderCharacters = characters.map(({ className, value, id, wordId, word }) => {
    return <Character id={id} word={word} wordId={wordId} key={id} className={className} value={value}></Character>
  })

  const renderExtraCharacters = extraCharacters?.map(({ className, value, id, wordId, word }) => {
    return (
      <ExtraCharacter id={id} word={word} wordId={wordId} key={id} className={className} value={value}></ExtraCharacter>
    )
  })

  return (
    <Flex ref={ref} m="0.25em" borderBottom="2px solid transparent" lineHeight="1em" boxSizing="border-box">
      {renderCharacters}
      {renderExtraCharacters}
    </Flex>
  )
})

Index.displayName = 'Word'

export default Index
