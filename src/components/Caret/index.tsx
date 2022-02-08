import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { characterIndexAtom, wordOffsetAtom } from '../../store'

function Index({ fontSize }: { fontSize: number }) {
  const [wordOffset] = useAtom(wordOffsetAtom)
  const [characterIndex] = useAtom(characterIndexAtom)
  const [offset, setOffset] = useState(0)
  const [delay, setDelay] = useState(100)

  useEffect(() => {
    setOffset(characterIndex * 16 * fontSize * 0.6)
  }, [characterIndex])

  useEffect(() => {
    setDelay(0)
    setTimeout(() => {
      setDelay(100)
    })
  }, [wordOffset.top])

  return (
    <Box
      position="absolute"
      h="35px"
      top={`${wordOffset.top}px`}
      transition={`left ${delay}ms linear`}
      left={`${wordOffset.left + offset}px`}
      borderRadius="md"
      width="2px"
      fontWeight="bold"
      bg="green.200"
    />
  )
}

export default Index
