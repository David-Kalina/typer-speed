import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { caretOffsetAtom, testStartedAtom } from '../../store'

function Index({ delay }: { delay: number }) {
  const [carretOffset] = useAtom(caretOffsetAtom)
  const [testStarted] = useAtom(testStartedAtom)

  return (
    <Box
      position="absolute"
      h="1.25em"
      top={`${carretOffset.top + -2}px `}
      transition={`left ${delay}ms linear`}
      left={`${carretOffset.left - 2}px`}
      borderRadius="md"
      width="0.14em"
      fontWeight="bold"
      bg="brand.200"
      className={testStarted ? undefined : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
