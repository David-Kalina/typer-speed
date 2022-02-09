import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import { characterIndexAtom, wordOffsetAtom } from '../../store'

function Index({ fontSize }: { fontSize: number }) {
  const [wordOffset] = useAtom(wordOffsetAtom)
  const [characterIndex] = useAtom(characterIndexAtom)
  const [offset, setOffset] = useState(75)
  const [delay, setDelay] = useState(50)

  const offSetWidth = useMemo(() => 16 * fontSize * 0.6, [fontSize])

  useEffect(() => {
    setOffset(characterIndex * offSetWidth)
  }, [characterIndex])

  useEffect(() => {
    setDelay(0)
    setTimeout(() => {
      setDelay(75)
    })
  }, [wordOffset.top])

  return (
    <Box
      position="absolute"
      h="1.25em"
      top={`${wordOffset.top + -8}px `}
      transition={`left ${delay}ms linear`}
      left={`${wordOffset.left + offset}px`}
      borderRadius="md"
      width="0.14em"
      fontWeight="bold"
      bg="green.200"
    />
  )
}

export default Index
