import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { caretOffsetAtom } from '../../store'

function Index({ delay }: { delay: number }) {
  const [carretOffset] = useAtom(caretOffsetAtom)

  return (
    <Box
      position="absolute"
      h="1.25em"
      top={`${carretOffset.top + -8}px `}
      transition={`left ${delay}ms linear`}
      left={`${carretOffset.left - 2}px`}
      borderRadius="md"
      width="0.14em"
      fontWeight="bold"
      bg="green.200"
    />
  )
}

export default Index
