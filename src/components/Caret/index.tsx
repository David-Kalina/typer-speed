import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { useMountCaret } from '../../hooks/useMountCaret'
import { caretPositionAtom } from '../../store'

function Index({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ top, left }] = useAtom(caretPositionAtom)

  useMountCaret(ref)

  return (
    <Box
      ref={ref}
      position="absolute"
      h="1.25em"
      top={`${top}px `}
      transition={`left ${delay}ms linear`}
      left={`${left}px`}
      borderRadius="md"
      width="0.1em"
      fontWeight="bold"
      bg="brand.200"
      // className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
