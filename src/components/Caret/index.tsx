import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { useMountCaret } from '../../hooks/useMountCaret'
import { caretPositionAtom, testStartedAtom } from '../../store'

function Index({ delay }: { delay: number }) {
  const [testStarted] = useAtom(testStartedAtom)
  const ref = React.useRef<HTMLDivElement>(null)
  const [{ top, left }] = useAtom(caretPositionAtom)
  useMountCaret(ref)

  return (
    <Box
      ref={ref}
      position="absolute"
      h="1.25em"
      top={`${top - 4}px `}
      transition={`left ${delay}ms linear`}
      left={`${testStarted ? left : 4}px`}
      borderRadius="md"
      width="0.1em"
      fontWeight="bold"
      bg="brand.200"
      className={testStarted ? 'caret' : 'blink'}
    />
  )
}

Index.displayName = 'Caret'

export default Index
